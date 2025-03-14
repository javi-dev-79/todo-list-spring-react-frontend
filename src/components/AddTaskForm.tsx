import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack
} from '@chakra-ui/react'
import { AddTaskFormProps } from '../types/addTaskFormProps'

const AddTaskForm = ({
  isOpen,
  onClose,
  newTask,
  description,
  endDate,
  onNewTaskChange,
  onDescriptionChange,
  onEndDateChange,
  onAddTask
}: AddTaskFormProps) => {
  const handleSubmit = async () => {
    console.log('Enviando tarea a la API:', {
      title: newTask,
      description,
      endDate
    })
    await onAddTask()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      {' '}
      <ModalOverlay />
      <ModalContent mx={4} w={['90%', '500px']}>
        {' '}
        <ModalHeader textAlign="center">Agregar Nueva Tarea</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Input
              placeholder="Título de la tarea"
              value={newTask}
              onChange={(e) => onNewTaskChange(e.target.value)}
            />
            <Textarea
              placeholder="Descripción"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
            <Input type="date" value={endDate} onChange={(e) => onEndDateChange(e.target.value)} />
          </VStack>
        </ModalBody>
        <ModalFooter gap={2} justifyContent="center">
          {' '}
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Agregar Tarea
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddTaskForm
