import { Navigate, Outlet } from 'react-router-dom'
import { authApi } from '../api/authApi'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth()
  const user = authApi.getUser()

  console.log('🔹 PrivateRoute: Usuario autenticado?', isAuthenticated)
  console.log('🔹 PrivateRoute: Rol del usuario:', user?.role)

  if (!isAuthenticated) {
    console.log('❌ Usuario no autenticado, redirigiendo a /login')
    return <Navigate to="/login" replace />
  }

  if (user?.role === 'ADMIN') {
    console.log('✅ Usuario es ADMIN, redirigiendo a /admin/panel')
    return <Navigate to="/admin/panel" replace={false} />
  }

  console.log('✅ Usuario es USER, mostrando /tasks')
  return <Outlet />
}

export default PrivateRoute
