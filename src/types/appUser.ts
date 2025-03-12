import { TaskList } from './taskList'

export interface AppUser {
  id: string
  name: string
  email: string
  taskLists: TaskList[]
}
