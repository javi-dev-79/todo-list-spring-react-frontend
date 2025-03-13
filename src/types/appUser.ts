import { Role } from './role'
import { TaskList } from './taskList'

export interface AppUser {
  id: string
  name: string
  email: string
  password: string
  role: Role
  taskLists: TaskList[]
}
