import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  useColorMode,
  useTheme
} from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()
  const theme = useTheme()
  const { isAuthenticated, logout } = useAuth()

  const userRole = localStorage.getItem('role')

  const handleAuthentication = () => {
    if (isAuthenticated) {
      logout()
      navigate('/')
    } else {
      navigate('/login')
    }
  }

  return (
    <Box bg="primary.400" color="white" py={4} px={8} position="fixed" top="0" left="0" right="0">
      <Flex justify="space-between" align="center">
        {/* Logo / Title */}
        <Heading size="lg" cursor={'pointer'} onClick={() => navigate('/')}>
          Todo List
        </Heading>

        {/* Navigation */}
        <Flex gap={6}>
          <Link
            as={RouterLink}
            to="/"
            fontSize="lg"
            fontWeight={'bold'}
            mr={8}
            _hover={{ textDecoration: 'none' }}
          >
            INICIO
          </Link>
          {isAuthenticated && (
            <Link
              as={RouterLink}
              to="/tasks"
              fontSize="lg"
              fontWeight={'bold'}
              mr={8}
              _hover={{ textDecoration: 'none' }}
            >
              TAREAS
            </Link>
          )}
        </Flex>

        {isAuthenticated && userRole === 'ADMIN' && (
          <Link
            as={RouterLink}
            to="/admin/panel"
            fontSize="lg"
            fontWeight="bold"
            mr={8}
            _hover={{ textDecoration: 'none' }}
          >
            ADMIN PANEL
          </Link>
        )}

        {/* Authentication Button */}
        <Button bg={theme.colors.white} color={'primary.400'} onClick={handleAuthentication} p={4}>
          {isAuthenticated ? 'SALIR' : 'INGRESAR'}
        </Button>

        {/* Dark mode */}
        <Flex align="center" gap={4}>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon boxSize={5} /> : <SunIcon boxSize={5} />}
            onClick={toggleColorMode}
            bg="white"
            color="primary.400"
            p={2}
            borderRadius="10px"
            boxShadow="md"
            _hover={{ bg: 'gray.200' }}
            _active={{ bg: 'gray.300' }}
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header
