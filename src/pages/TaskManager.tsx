import { AddIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Text as ChakraText,
  Flex,
  Heading,
  IconButton,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { taskApi } from '../api/taskApi'
import { userApi } from '../api/userApi'
import AddTaskForm from '../components/AddTaskForm'
import DeleteConfirmation from '../components/DeleteConfirmation'
import { useAuth } from '../context/AuthContext'
import { AppUser } from '../types/appUser'
import { Task } from '../types/task'
import { TaskStatus } from '../types/taskStatus'

const TaskManager = () => {
  const { currentUser } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [appUser, setAppUser] = useState<AppUser | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState<string>('')
  const [description, setDescription] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const { isOpen: isDescOpen, onOpen: onDescOpen, onClose: onDescClose } = useDisclosure()
  const toast = useToast()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false)
  const [isDeleteExpiredModalOpen, setIsDeleteExpiredModalOpen] = useState(false)

  const openDeleteModal = (task: Task) => {
    setTaskToDelete(task)
    setIsDeleteModalOpen(true)
  }

  const handleTitleClick = (task: Task) => {
    setSelectedTask(task)
    onDescOpen()
  }

  const confirmDeleteTask = async () => {
    if (taskToDelete) {
      await handleDeleteTask(taskToDelete.id)
      setIsDeleteModalOpen(false)
      setTaskToDelete(null)
    }
  }

  const confirmDeleteExpiredTasks = async () => {
    await handleDeleteExpiredTasks()
    setIsDeleteExpiredModalOpen(false)
  }

  const isTaskExpired = (endDate: string | null) => {
    if (!endDate) return false

    const taskDate = new Date(endDate)
    const today = new Date()

    // Normalizar ambas fechas a solo fecha sin hora:
    taskDate.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)

    return taskDate < today
  }

  const expiredTasksCount = tasks.filter((task) => isTaskExpired(task.endDate)).length

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      console.error('❌ No hay token de autenticación')
    }
  }, [])

  useEffect(() => {
    console.log('CURRENTUSER es: ', currentUser)
    if (!currentUser?.email) {
      console.error('❌ currentUser no tiene un email válido:', currentUser)
      return
    }

    const fetchUser = async () => {
      try {
        console.log('Llamada al user en el fetchUser de TaskManager.tsx: ')
        const userData = await userApi.getUserByEmail(currentUser.email)
        setAppUser(userData)
        console.log('✅ appUser obtenido:', userData)
      } catch (error) {
        console.error('❌ Error obteniendo appUser:', error)
      }
    }

    fetchUser()
  }, [currentUser])

  useEffect(() => {
    console.log('🔹 appUser en TaskManager:', appUser)

    if (!appUser?.id) {
      console.error('❌ No hay `appUser.id`. No se pueden obtener tareas.')
      return
    }

    if (!appUser.taskLists?.length) {
      console.warn('⚠ `appUser.taskLists` está vacío. No hay listas de tareas para el usuario.')
      return
    }

    const fetchTasks = async () => {
      try {
        console.log('🔹 Obteniendo tareas para el usuario:', appUser.id)
        const userId = appUser.id
        const taskListId = appUser.taskLists[0].id
        const fetchedTasks = await taskApi.fetchTasks(userId, taskListId)

        console.log('✅ Tareas obtenidas:', fetchedTasks)
        setTasks(fetchedTasks)
      } catch (error) {
        console.error('❌ Error obteniendo tareas:', error)
      }
    }

    fetchTasks()
  }, [appUser])

  const handleAddTask = async () => {
    if (!newTask.trim()) {
      console.log('❌ Validación fallida: Título vacío')
      return
    }

    if (!appUser || !appUser.taskLists || appUser.taskLists.length === 0) {
      console.log('❌ Error: El usuario no tiene una lista de tareas asociada.')
      return
    }

    console.log('✅ `appUser` cargado correctamente:', appUser)

    try {
      const userId = appUser.id
      const taskListId = appUser.taskLists[0].id

      const formattedEndDate = endDate ? new Date(endDate).toISOString() : null

      const taskToAdd = {
        title: newTask,
        description,
        endDate: formattedEndDate,
        taskStatus: TaskStatus.PENDING,
        taskList: taskListId
      }

      console.log('🔹 Intentando crear tarea:', taskToAdd)
      const createdTask = await taskApi.addTask(userId, taskListId, taskToAdd)

      if (createdTask) {
        console.log('✅ Tarea creada exitosamente:', createdTask)

        const updatedTasks = await taskApi.fetchTasks(userId, taskListId)
        setTasks(updatedTasks)

        setNewTask('')
        setDescription('')
        setEndDate('')
        onClose()
      }
    } catch (error) {
      console.error('❌ Error al crear tarea:', error)
    }
  }

  const toggleTaskStatus = async (taskId: string) => {
    if (!appUser || !appUser.taskLists?.length) return

    const userId = appUser.id
    const taskListId = appUser.taskLists[0].id

    const taskToUpdate = tasks.find((task) => task.id === taskId)
    if (!taskToUpdate) return

    if (isTaskExpired(taskToUpdate.endDate)) {
      console.warn('❌ No se puede modificar el estado de una tarea vencida.')
      alert('Esta tarea está vencida y no se puede modificar su estado.')
      return
    }

    const newStatus =
      taskToUpdate.taskStatus === TaskStatus.PENDING ? TaskStatus.COMPLETED : TaskStatus.PENDING

    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, taskStatus: newStatus } : task))
    )

    try {
      console.log(`🔹 Actualizando estado de la tarea ${taskId} a ${newStatus}`)
      await taskApi.updateTaskStatus(userId, taskListId, taskId, newStatus)
      console.log('✅ Estado actualizado correctamente')
    } catch (error) {
      console.error('❌ Error actualizando estado de la tarea:', error)
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, taskStatus: taskToUpdate.taskStatus } : task
        )
      )
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    if (!appUser?.id || !appUser.taskLists?.length) return

    try {
      const userId = appUser.id
      const taskListId = appUser.taskLists[0].id
      await taskApi.deleteTask(userId, taskListId, taskId)

      setTasks(tasks.filter((task) => task.id !== taskId))
      toast({
        title: 'Tarea eliminada.',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      console.error('❌ Error eliminando tarea:', error)
      toast({
        title: 'Error al eliminar la tarea.',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }

  const confirmDeleteCompletedTasks = async () => {
    await handleDeleteCompletedTasks()
    setIsDeleteAllModalOpen(false)
  }

  const handleDeleteCompletedTasks = async () => {
    if (!appUser?.id || !appUser.taskLists?.length) return

    const userId = appUser.id
    const taskListId = appUser.taskLists[0].id

    const completedTasks = tasks.filter((task) => task.taskStatus === TaskStatus.COMPLETED)

    if (completedTasks.length === 0) {
      toast({
        title: 'No hay tareas completadas para eliminar.',
        status: 'info',
        duration: 2000,
        isClosable: true
      })
      return
    }

    try {
      for (const task of completedTasks) {
        await taskApi.deleteTask(userId, taskListId, task.id)
      }

      setTasks(tasks.filter((task) => task.taskStatus !== TaskStatus.COMPLETED))

      toast({
        title: 'Tareas completadas eliminadas.',
        status: 'success',
        duration: 2500,
        isClosable: true
      })
    } catch (error) {
      console.error('❌ Error eliminando tareas completadas:', error)
      toast({
        title: 'Error al eliminar tareas completadas.',
        status: 'error',
        duration: 2500,
        isClosable: true
      })
    }
  }

  const handleDeleteExpiredTasks = async () => {
    if (!appUser?.id || !appUser.taskLists?.length) return

    const userId = appUser.id
    const taskListId = appUser.taskLists[0].id

    const expiredTasks = tasks.filter((task) => isTaskExpired(task.endDate))

    if (expiredTasks.length === 0) {
      toast({
        title: 'No hay tareas vencidas para eliminar.',
        status: 'info',
        duration: 2000,
        isClosable: true
      })
      return
    }

    try {
      for (const task of expiredTasks) {
        await taskApi.deleteTask(userId, taskListId, task.id)
      }

      setTasks(tasks.filter((task) => !isTaskExpired(task.endDate)))

      toast({
        title: 'Tareas vencidas eliminadas.',
        status: 'success',
        duration: 2500,
        isClosable: true
      })
    } catch (error) {
      console.error('❌ Error eliminando tareas vencidas:', error)
      toast({
        title: 'Error al eliminar tareas vencidas.',
        status: 'error',
        duration: 2500,
        isClosable: true
      })
    }
  }

  return (
    <Box p={[3, 4, 6]} maxW="800px" mx="auto" w="100%">
      <Heading textAlign={'center'} mb={4} fontSize={['xl', '2xl', '3xl']}>
        Lista de Tareas
      </Heading>

      <Stack direction={['column', 'row']} justify={'space-between'} mb={4} spacing={[3, 4]}>
        <Stack direction={['column', 'row']} spacing={2}>
          <Button colorScheme="update" borderRadius={'full'} size={['sm', 'md']}>
            Tareas
            <Box bg={'white'} color={'black'} py={1} px={3} borderRadius={'full'} ml={2}>
              {tasks.length}
            </Box>
          </Button>
          <Button colorScheme="green" borderRadius={'full'} size={['sm', 'md']}>
            Tareas Completadas{' '}
            <Box bg={'white'} color={'black'} py={1} px={3} borderRadius={'full'} ml={2}>
              {tasks.filter((task) => task.taskStatus === TaskStatus.COMPLETED).length}
            </Box>
          </Button>
          <Button colorScheme="ended" borderRadius={'full'} size={['sm', 'md']}>
            Tareas Vencidas{' '}
            <Box bg={'white'} color={'black'} py={1} px={3} borderRadius={'full'} ml={2}>
              {expiredTasksCount}
            </Box>
          </Button>
        </Stack>
      </Stack>

      <List spacing={3} mb={4}>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            p={[2, 3]}
            borderRadius={'md'}
            bg={
              isTaskExpired(task.endDate)
                ? 'red.100'
                : task.taskStatus === TaskStatus.COMPLETED
                  ? 'gray.200'
                  : 'white'
            }
            textDecoration={task.taskStatus === TaskStatus.COMPLETED ? 'line-through' : 'none'}
            border={'1px solid'}
            borderColor={'gray.300'}
            flexDirection={['column', 'row']}
            gap={[2, 0]}
          >
            <Flex
              align={'center'}
              gap={2}
              w={['100%', 'auto']}
              justify={['space-between', 'flex-start']}
            >
              <IconButton
                icon={<CheckIcon />}
                colorScheme={
                  isTaskExpired(task.endDate)
                    ? 'red'
                    : task.taskStatus === TaskStatus.COMPLETED
                      ? 'green'
                      : 'gray'
                }
                aria-label="Toggle Task Status"
                onClick={() => toggleTaskStatus(task.id)}
                size={['sm', 'md']}
                isDisabled={isTaskExpired(task.endDate)}
              />
              <Flex direction="column" cursor="pointer" onClick={() => handleTitleClick(task)}>
                <Text fontSize={['sm', 'md']} fontWeight="bold">
                  {task.title}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Fecha límite:{' '}
                  {task.endDate ? new Date(task.endDate).toLocaleDateString() : 'Sin fecha'}
                </Text>
              </Flex>
              {isTaskExpired(task.endDate) && (
                <Text color="red.500" fontSize="sm" fontWeight="bold">
                  Vencida
                </Text>
              )}
            </Flex>
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="danger"
              aria-label="Delete Task"
              onClick={() => openDeleteModal(task)}
              size={['sm', 'md']}
              w={['100%', 'auto']}
            />
          </ListItem>
        ))}
      </List>

      <Flex justify="space-between" mt={4} align="center">
        <Stack direction="row" spacing={2}>
          <Button colorScheme="danger" onClick={handleDeleteCompletedTasks} size={['sm', 'md']}>
            <DeleteIcon mr={1} /> Eliminar Completadas
          </Button>
          <Button
            colorScheme="danger"
            onClick={() => setIsDeleteExpiredModalOpen(true)}
            size={['sm', 'md']}
          >
            <DeleteIcon mr={1} /> Eliminar Vencidas
          </Button>
        </Stack>

        <IconButton
          icon={<AddIcon />}
          colorScheme="blue"
          aria-label="Add Task"
          onClick={onOpen}
          size={['md', 'lg']}
          borderRadius="full"
          w="auto"
          h={12}
          fontSize="20px"
        />
      </Flex>

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        title="Eliminar tarea"
        message={`¿Quieres eliminar la tarea "${taskToDelete?.title}"?`}
        onConfirm={confirmDeleteTask}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      <DeleteConfirmation
        isOpen={isDeleteAllModalOpen}
        title="Eliminar tareas completadas"
        message="¿Estás seguro de que deseas eliminar todas las tareas completadas?"
        onConfirm={confirmDeleteCompletedTasks}
        onCancel={() => setIsDeleteAllModalOpen(false)}
      />

      <DeleteConfirmation
        isOpen={isDeleteExpiredModalOpen}
        title="Eliminar tareas vencidas"
        message="¿Estás seguro de que deseas eliminar todas las tareas vencidas?"
        onConfirm={confirmDeleteExpiredTasks}
        onCancel={() => setIsDeleteExpiredModalOpen(false)}
      />

      <AddTaskForm
        isOpen={isOpen}
        onClose={onClose}
        newTask={newTask}
        description={description}
        endDate={endDate}
        onNewTaskChange={setNewTask}
        onDescriptionChange={setDescription}
        onEndDateChange={setEndDate}
        onAddTask={handleAddTask}
      />

      <Modal isOpen={isDescOpen} onClose={onDescClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Descripción de la tarea</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChakraText fontWeight="bold" mb={2}>
              {selectedTask?.title}
            </ChakraText>
            <ChakraText>{selectedTask?.description || 'No hay descripción disponible.'}</ChakraText>
            <ChakraText mt={3} fontSize="sm" color="gray.500">
              Fecha límite:{' '}
              {selectedTask?.endDate
                ? new Date(selectedTask.endDate).toLocaleDateString()
                : 'Sin fecha'}
            </ChakraText>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default TaskManager
