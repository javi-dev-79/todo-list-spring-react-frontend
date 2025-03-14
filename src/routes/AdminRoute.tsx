import { Navigate, Outlet } from 'react-router-dom'
import { authApi } from '../api/authApi'

const AdminRoute = () => {
  const user = authApi.getUser()

  console.log('🔹 AdminRoute: Usuario autenticado?', user)
  console.log('🔹 AdminRoute: Rol del usuario:', user?.role)

  if (!user || user.role !== 'ADMIN') {
    console.log('❌ Usuario no autorizado para ADMIN PANEL, redirigiendo a /tasks')
    return <Navigate to="/tasks" replace />
  }

  console.log('✅ Usuario ADMIN, mostrando panel de administración')
  return <Outlet />
}

export default AdminRoute
