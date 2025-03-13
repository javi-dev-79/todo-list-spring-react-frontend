import { Navigate } from 'react-router-dom'
import { authApi } from '../api/authApi'
import { JSX } from 'react'

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const user = authApi.getUser()
  return user?.role === 'ADMIN' ? children : <Navigate to="/" />
}

export default AdminRoute
