import { Box, Heading, Text, Button, useTheme, Link } from '@chakra-ui/react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <Box textAlign="center" p={8}>
      <Heading mb={4}>Bienvenido a Todo List</Heading>
      <Text fontSize="lg" mb={6}>
        Organiza tus tareas de forma eficiente y sin complicaciones.
      </Text>

      <Button
        bg={theme.colors.primary[400]}
        color="white"
        _hover={{ bg: theme.colors.primary[300] }}
        mr={4}
        onClick={() => navigate('/login')}
      >
        Iniciar Sesión
      </Button>

      <Button
        bg={theme.colors.primary[400]}
        color="white"
        _hover={{ bg: theme.colors.primary[300] }}
        onClick={() => navigate('/register')}
      >
        Registrarse
      </Button>

      <Text mt={4}>
        ¿No tienes cuenta?{' '}
        <Link as={RouterLink} to="/register" color="blue.500">
          Regístrate
        </Link>
      </Text>
    </Box>
  )
}

export default Home
