import { Box } from '@chakra-ui/react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import TaskManager from './pages/TaskManager'
import { authApi } from './api/authApi'
import { JSX } from 'react'

function App() {

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return authApi.isAuthenticated() ? children: <Navigate to="/login" />
  }
  return (
    <Router>
      <Box minH="100vh" display="flex" flexDirection="column">
        <Header />

        {/* Contenedor principal con padding para evitar que el Header lo cubra */}
        <Box flex="1" p={5} pt="150px" overflow="auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <TaskManager />
                </PrivateRoute>
              }
            />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </Router>
  )
}

export default App
