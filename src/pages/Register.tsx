import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  useToast,
  FormControl,
  FormErrorMessage,
  Link,
  Text
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { authApi } from '../api/authApi'
import { AxiosError } from 'axios'

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es obligatorio'),
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Correo inválido')
    .required('El correo es obligatorio'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es obligatoria')
})

const Register = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(registerSchema)
  })

  const onSubmit = async (data: { name: string; email: string; password: string }) => {
    try {
      await authApi.register(data.name, data.email, data.password)
      toast({ title: 'Registro exitoso', status: 'success', duration: 3000 })
      navigate('/login')
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>
      toast({
        title: 'Error en el registro',
        description: error.response?.data?.message || 'No se pudo registrar el usuario',
        status: 'error',
        duration: 3000
      })
    }
  }

  return (
    <Box p={8} maxW="400px" mx="auto" textAlign="center" mt={20}>
      <Heading mb={6}>Crear Cuenta</Heading>
      <VStack spacing={4} p={8} border="2px solid" borderRadius={10}>
        <FormControl isInvalid={!!errors.name}>
          <Input placeholder="Nombre" {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

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
