import { AddIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  List,
  ListItem,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { taskApi } from '../api/taskApi'
import { userApi } from '../api/userApi'
import AddTaskForm from '../components/AddTaskForm'
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

  useEffect(() => {
    if (!currentUser?.email) return

    const fetchUser = async () => {
      try {
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
    if (!appUser?.id || !appUser?.taskLists?.length) return

    const fetchTasks = async () => {
      try {
        const userId = appUser.id
        const taskListId = appUser.taskLists[0].id
        const fetchedTasks = await taskApi.fetchTasks(userId, taskListId)
        setTasks(fetchedTasks)
        console.log('✅ Tareas cargadas:', fetchedTasks)
      } catch (error) {
        console.error('❌ Error obteniendo tareas:', error)
      }
    }

    fetchTasks()
  }, [appUser])

  const handleAddTask = async () => {
    if (!newTask.trim() || !appUser?.id || !appUser.taskLists?.length) return

    try {
      const userId = appUser.id
      const taskListId = appUser.taskLists[0].id
      const createdTask = await taskApi.addTask(userId, taskListId, {
        title: newTask,
        description: description,
        endDate: endDate,
        taskStatus: TaskStatus.PENDING,
        taskList: { id: taskListId, name: 'General' }
      })

      console.log('✅ Tarea creada:', createdTask)

      const fetchedTasks = await taskApi.fetchTasks(userId, taskListId)
      setTasks(fetchedTasks)

      setNewTask('')
      setDescription('')
      setEndDate('')
    } catch (error) {
      console.error('❌ Error al crear tarea:', error)
    }
  }

  const toggleTaskStatus = async (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              taskStatus:
                task.taskStatus === TaskStatus.PENDING ? TaskStatus.COMPLETED : TaskStatus.PENDING
            }
          : task
      )
    )
  }

  const handleDeleteTask = async (taskId: string) => {
    if (!appUser?.id || !appUser.taskLists?.length) return

    try {
      const userId = appUser.id
      const taskListId = appUser.taskLists[0].id
      await taskApi.deleteTask(userId, taskListId, taskId)

      setTasks(tasks.filter((task) => task.id !== taskId))
    } catch (error) {
      console.error('❌ Error eliminando tarea:', error)
    }
  }

  const handleDeleteCompletedTasks = async () => {
    const completedTaskIds = tasks
      .filter((task) => task.taskStatus === TaskStatus.COMPLETED)
      .map((task) => task.id)

    for (const taskId of completedTaskIds) {
      await handleDeleteTask(taskId)
    }
  }

  return (
    <Box p={[3, 4, 6]} maxW="800px" mx="auto" w="100%">
      <Heading textAlign={'center'} mb={4} fontSize={['xl', '2xl', '3xl']}>
        Lista de Tareas
      </Heading>

      <Stack direction={['column', 'row']} justify={'space-between'} mb={4} spacing={[3, 4]}>
        <Stack direction={['column', 'row']} spacing={2}>
          <Button colorScheme="blue" borderRadius={'full'} size={['sm', 'md']}>
            Tareas
            <Box bg={'white'} color={'black'} py={1} px={3} borderRadius={'full'} ml={2}>
              {tasks.length}
            </Box>
          </Button>
          <Button colorScheme="blue" borderRadius={'full'} size={['sm', 'md']}>
            Tareas Completadas{' '}
            <Box bg={'white'} color={'black'} py={1} px={3} borderRadius={'full'} ml={2}>
              {tasks.filter((task) => task.taskStatus === TaskStatus.COMPLETED).length}
            </Box>
          </Button>
        </Stack>
        <Stack direction={['column', 'row']} spacing={2}>
          <Button
            colorScheme="red"
            onClick={handleDeleteCompletedTasks}
            size={['sm', 'md']}
            w={['100%', 'auto']}
          >
            <DeleteIcon mr={1} /> Eliminar Completadas
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
            bg={task.taskStatus === TaskStatus.COMPLETED ? 'gray.200' : 'white'}
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
                colorScheme={task.taskStatus === TaskStatus.COMPLETED ? 'green' : 'gray'}
                aria-label="Toggle Task Status"
                onClick={() => toggleTaskStatus(task.id)}
                size={['sm', 'md']}
              />
              <Text fontSize={['sm', 'md']}>{task.title}</Text>
            </Flex>
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              aria-label="Delete Task"
              onClick={() => handleDeleteTask(task.id)}
              size={['sm', 'md']}
              w={['100%', 'auto']}
            />
          </ListItem>
        ))}
      </List>

      <Flex justify="flex-end" mt={4}>
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
    </Box>
  )
}

export default TaskManager
