import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  useToast
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { authApi } from '../api/authApi'
import { useAuth } from '../context/AuthContext'

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Correo inválido')
    .required('El correo es obligatorio'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria')
})

const Login = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const token = await authApi.login(data.email, data.password)
      login(token)

      setTimeout(() => {
        const userRole = localStorage.getItem('role') || 'NO DEFINIDO'

        console.log('🔹 Usuario autenticado:')
        console.log('Email:', data.email)
        console.log('Rol:', userRole)

        toast({ title: 'Inicio de sesión exitoso', status: 'success', duration: 3000 })

        if (userRole.trim().toUpperCase() === 'ADMIN') {
          console.log('🔹 Redirigiendo a /admin/panel')
          navigate('/admin/panel', { replace: true })
        } else {
          console.log('🔹 Redirigiendo a /tasks')
          navigate('/tasks', { replace: true })
        }
      }, 100)
    } catch (err) {
      console.error('❌ Error en el login:', err)
      toast({ title: 'Error al iniciar sesión', status: 'error', duration: 3000 })
    }
  }

  return (
    <Box p={8} maxW="400px" mx="auto" textAlign="center" mt={20}>
      <Heading mb={6}>Iniciar Sesión</Heading>
      <VStack spacing={4} p={8} border="2px solid" borderRadius={10}>
        <FormControl isInvalid={!!errors.email}>
          <Input placeholder="Correo electrónico" {...register('email')} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <Input placeholder="Contraseña" type="password" {...register('password')} />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button
          colorScheme="green"
          width="100%"
          onClick={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
        >
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
