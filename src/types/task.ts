import { TaskList } from "./taskList"
import { TaskStatus } from "./taskStatus"

export interface Task {
  id: string
  title: string
  description?: string
  endDate?: string | null
  taskStatus: TaskStatus
  taskList: TaskList
}
