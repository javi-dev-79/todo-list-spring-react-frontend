import { Box, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import { Task } from '../types/task'

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('ALL')

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value)
  }

  const handleDeleteCompleted = () => {
    setTasks(tasks.filter((task) => task.taskStatus !== 'COMPLETED'))
  }

  return (
    <Box p={8} maxW="1000px" mx="auto">
      {/* Título */}
      <Heading textAlign={'center'} mb={6}>
        Lista de Tareas
      </Heading>
    </Box>
  )
}

export default TaskManager
