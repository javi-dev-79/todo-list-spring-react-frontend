import { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '../api/authApi'
import { userApi } from '../api/userApi'
import { AppUser } from '../types/appUser'
import { AuthContextType } from '../types/authContextType'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    const checkAuth = async () => {
      console.log('🔹 Iniciando validación de autenticación...')
      const token = authApi.getToken()

      if (!token) {
        console.log('❌ No hay token. Deslogueando usuario...')
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }

      try {
        console.log('🔹 Buscando usuario en sessionStorage...')
        const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}')

        if (!storedUser.email) {
          console.log('❌ No se encontró usuario en sessionStorage.')
          setIsAuthenticated(false)
          setIsLoading(false)
          return
        }

        console.log('🔹 Obteniendo usuario desde la API...')
        const appUser = await userApi.getUserByEmail(storedUser.email)

        console.log('✅ Usuario autenticado:', appUser)
        setCurrentUser(appUser)
        setIsAuthenticated(true)
        sessionStorage.setItem('user', JSON.stringify(appUser))
      } catch (error) {
        console.error('❌ Error refrescando usuario:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (token: string) => {
    authApi.setToken(token)
    const user = authApi.getUser()

    if (user) {
      try {
        const appUser = await userApi.getUserByEmail(user.email)
        setCurrentUser(appUser)
        setIsAuthenticated(true)
        sessionStorage.setItem('user', JSON.stringify(appUser))
        console.log('✅ Usuario autenticado correctamente:', appUser)
      } catch (error) {
        console.error('❌ Error obteniendo usuario desde backend:', error)
        setIsAuthenticated(false)
      }
    } else {
      console.error('❌ No se pudo recuperar el usuario desde sessionStorage.')
      setIsAuthenticated(false)
    }
  }

  const logout = () => {
    authApi.logout()
    sessionStorage.removeItem('user')
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  const refreshUser = async () => {
    if (!currentUser?.email) return

    try {
      console.log('Llamada al user en RefreshUser')
      const appUser = await userApi.getUserByEmail(currentUser.email)
      setCurrentUser(appUser)
      sessionStorage.setItem('user', JSON.stringify(appUser))
    } catch (error) {
      console.error('❌ Error refrescando usuario:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, currentUser, login, logout, refreshUser }}
    >
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
