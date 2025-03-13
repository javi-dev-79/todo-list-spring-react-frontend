import { Box, Button, Heading, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { userApi } from '../api/userApi'
import { AppUser } from '../types/appUser'

const UserManager = () => {
  const [users, setUsers] = useState<AppUser[]>([])

  useEffect(() => {
    userApi
      .getUsers()
      .then(setUsers)
      .catch((error) => console.log('Error obteniendo usuarios:', error))
  }, [])

  return (
    <Box p={8}>
      <Heading mb={6}>Gestión de Usuarios</Heading>

      <Table variant={"simple"}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Email</Th>
            <Th>Rol</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>
                <Button colorScheme='red' size={"sm"} onClick={() => console.log('Eliminar usuario', user.id)}>
                  Eliminar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default UserManager
