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
import { useState } from 'react'

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
  const today = new Date().toISOString().split('T')[0] // 🔹 Fecha mínima permitida (hoy)
  const [error, setError] = useState<string | null>(null) // 🔹 Estado para el mensaje de error

  const handleSubmit = () => {
    console.log('Pasa por handleSubmit en AddTaskForm')
    console.log('NewTask es:', newTask)

    if (!newTask.trim()) return

    // 🔹 Validar que la fecha no sea anterior a hoy
    if (endDate && endDate < today) {
      setError('La fecha no puede ser anterior a hoy')
      return
    }

    setError(null) // 🔹 Resetear error si la fecha es válida
    onAddTask()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx={4} w={['90%', '500px']}>
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
            {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}{' '}
          </VStack>
        </ModalBody>

        <ModalFooter gap={2} justifyContent="center">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit} isDisabled={!newTask.trim()}>
            Agregar Tarea
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddTaskForm
