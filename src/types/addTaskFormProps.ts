export interface AddTaskFormProps {
  isOpen: boolean
  onClose: () => void
  newTask: string
  description: string
  endDate: string
  onNewTaskChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onEndDateChange: (value: string) => void
  onAddTask: () => void
}
