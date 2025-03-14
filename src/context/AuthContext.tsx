import { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '../api/authApi'
import { AuthContextType } from '../types/authContextType'
import { AppUser } from '../types/appUser'
import { userApi } from '../api/userApi'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null)

  useEffect(() => {
    const token = authApi.getToken()
    const storedUser = localStorage.getItem('user')

    if (token && storedUser) {
      setIsAuthenticated(true)
      setCurrentUser(JSON.parse(storedUser))
    }
  }, [])

  const refreshUser = async () => {
    if (!currentUser) return

    try {
      const appUser = await userApi.getUserByEmail(currentUser.email)
      setCurrentUser(appUser)
      localStorage.setItem('user', JSON.stringify(appUser))
    } catch (error) {
      console.error('❌ Error refrescando usuario:', error)
    }
  }

  const login = async (token: string) => {
    authApi.setToken(token)
    const user = authApi.getUser()

    if (user !== null) {
      try {
        const appUser = await userApi.getUserByEmail(user.email)
        setCurrentUser(appUser)
        localStorage.setItem('user', JSON.stringify(appUser))
      } catch (error) {
        console.error('❌ Error obteniendo usuario desde backend:', error)
      }
    }

    setIsAuthenticated(true)
  }

  const logout = () => {
    authApi.logout()
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}
