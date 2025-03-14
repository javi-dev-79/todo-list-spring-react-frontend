import { AppUser } from './appUser'

export interface AuthContextType {
  isAuthenticated: boolean
  currentUser: AppUser | null
  login: (token: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}
