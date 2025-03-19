import { JSX, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface PrivateRouteProps {
  element: JSX.Element
  roles?: string[]
}

const PrivateRoute = ({ element, roles }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading, currentUser } = useAuth()
  const location = useLocation()

  const [isChecking, setIsChecking] = useState(true)

  console.log('🔹 PrivateRoute ejecutándose...')
  console.log('🔹 Usuario autenticado?', isAuthenticated)
  console.log('🔹 isLoading?', isLoading)
  console.log('🔹 Ruta actual:', location.pathname)

  useEffect(() => {
    console.log('🔹 PrivateRoute: Usuario autenticado?', isAuthenticated)
    console.log('🔹 PrivateRoute: Rol del usuario:', currentUser?.role || 'NO DEFINIDO')
    console.log('🔹 PrivateRoute: Ruta actual:', location.pathname)

    if (!isLoading) {
      console.log('🟡 Cargando autenticación...')
      setIsChecking(false)
    }
  }, [isAuthenticated, isLoading, currentUser, location])

  if (isLoading || isChecking) {
    return null
  }

  if (!isAuthenticated) {
    console.error('❌ Usuario no autenticado, redirigiendo a /login')
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.includes(currentUser?.role || '')) {
    console.error('❌ Usuario sin permisos para acceder a esta ruta.')
    return <Navigate to="/unauthorized" replace />
  }

  return element
}

export default PrivateRoute
