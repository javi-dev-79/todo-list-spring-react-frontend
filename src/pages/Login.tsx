import { Box, Button, Heading, Input, Link, Text, VStack, useTheme, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { authApi } from '../api/authApi'

const Login = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      await authApi.login(email, password)
      toast({ title: "Inicio de sesión exitoso", status: "success", duration: 3000})
      navigate('tasks')
    } catch {
      toast({ title: "Error al iniciar sesión", status: "error", duration: 3000})
    }
  }

  return (
    <Box p={8} maxW={'400px'} mx={'auto'} textAlign={'center'} mt={20}>
      <Heading mb={6}>Iniciar Sesión</Heading>

      <VStack
        spacing={4}
        border={'2px solid'}
        borderColor={theme.colors.primary[400]}
        p={8}
        borderRadius={10}
      >
        <Input
          placeholder="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="green" width={'100%'} onClick={handleLogin}>
          Iniciar Sesión
        </Button>
      </VStack>

      <Text mt={4}>
        ¿No tienes cuenta?{' '}
        <Link as={RouterLink} to="/register" color="blue.500">
          Regístrate
        </Link>
      </Text>
    </Box>
  )
}

export default Login
