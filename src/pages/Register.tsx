import {
  Box,
  Button,
  Heading,
  Input,
  Link,
  Text,
  useTheme,
  useToast,
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const toast = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    try {
      console.log('Registrando usuario:', { name, email, password })
      toast({ title: 'Registro exitoso', status: 'success', duration: 3000 })
      navigate('/login')
    } catch {
      toast({ title: 'Error en el registro', status: 'error', duration: 3000 })
    }
  }

  return (
    <Box p={8} maxW={'400px'} mx={'auto'} textAlign={'center'} mt={20}>
      <Heading mb={6}>Crear Cuenta</Heading>

      <VStack
        spacing={4}
        border={'2px solid'}
        borderColor={theme.colors.primary[400]}
        p={8}
        borderRadius={10}
      >
        <Input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="green" width={'100%'} onClick={handleRegister}>
          Registrarse
        </Button>
      </VStack>

      <Text mt={4}>
        ¿Ya tienes cuenta?{' '}
        <Link as={RouterLink} to="/login" color="blue.500">
          Inicia sesión
        </Link>
      </Text>
    </Box>
  )
}

export default Register
