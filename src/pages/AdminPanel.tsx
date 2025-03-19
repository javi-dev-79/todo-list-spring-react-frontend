import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useTheme,
  useToast
} from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { userApi } from '../api/userApi'
import { AppUser } from '../types/appUser'
import { Role } from '../types/role'

const AdminPanel = () => {
  const [users, setUsers] = useState<AppUser[]>([])
  const toast = useToast()
  const theme = useTheme()

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data = await userApi.getUsers()
      setUsers(data)
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>
      toast({
        title: 'Error cargando usuarios',
        description: err.response?.data?.message || 'No se pudo cargar la lista de usuarios',
        status: 'error',
        duration: 3000
      })
    }
  }

  const handleRoleChange = async (userId: string, currentRole: string) => {
    const newRole: Role = currentRole === Role.ADMIN ? Role.USER : Role.ADMIN

    try {
      await userApi.updateUserRole(userId, newRole)
      toast({ title: 'Rol actualizado', status: 'success', duration: 3000 })
      loadUsers()
    } catch (error) {
      console.error('❌ Error en la actualización del rol:', error)
      toast({ title: 'Error al actualizar rol', status: 'error', duration: 3000 })
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      await userApi.deleteUser(userId)
      toast({ title: 'Usuario eliminado', status: 'success', duration: 3000 })
      loadUsers()
    } catch {
      toast({ title: 'Error al eliminar usuario', status: 'error', duration: 3000 })
    }
  }

  return (
    <Box p={8} maxW="1000px" mx="auto" textAlign="center">
      <Heading mb={6}>Panel de Administración</Heading>

      {/* 🔹 Contenedor con scroll horizontal para dispositivos pequeños */}
      <TableContainer
        border="2px solid"
        borderColor={theme.colors.primary[400]}
        borderRadius="10px"
        p={4}
        overflowX="auto"
      >
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Email</Th>
              <Th>Rol</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role === 'ADMIN' ? 'Administrador' : 'Usuario'}</Td>
                <Td>
                  <Button
                    size="sm"
                    bg={theme.colors.update[500]}
                    color={theme.colors.white}
                    onClick={() => handleRoleChange(user.id, user.role)}
                  >
                    Cambiar Rol
                  </Button>
                  <Button
                    size="sm"
                    bg={theme.colors.danger[500]}
                    color={theme.colors.white}
                    ml={2}
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AdminPanel
