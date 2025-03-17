import { AppUser } from './appUser'

export interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  currentUser: AppUser | null
  login: (token: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}
