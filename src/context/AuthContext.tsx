import { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '../api/authApi'
import { AuthContextType } from '../types/authContextType'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const token = authApi.getToken()
    setIsAuthenticated(!!token)
  }, [])

  const login = (token: string) => {
    authApi.setToken(token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    authApi.logout()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
