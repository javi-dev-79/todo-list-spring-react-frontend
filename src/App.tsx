import { Box } from '@chakra-ui/react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import AdminPanel from './pages/AdminPanel'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import TaskManager from './pages/TaskManager'
import AdminRoute from './routes/AdminRoute'
import PrivateRoute from './routes/PrivateRoute'

function App() {
  return (
    <Router>
      <Box minH="100vh" display="flex" flexDirection="column">
        <Header />

        <Box flex="1" p={5} pt="150px" overflow="auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 🔹 Ruta protegida para usuarios autenticados */}
            <Route element={<PrivateRoute />}>
              <Route path="/tasks" element={<TaskManager />} />
            </Route>

            {/* 🔹 Ruta protegida solo para ADMIN */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/panel" element={<AdminPanel />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </Router>
  )
}

export default App
