import { Box } from '@chakra-ui/react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import TaskManager from './pages/TaskManager'
import UserManager from './pages/UserManager' // 🔹 Importamos UserManager
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
            <Route path="/tasks" element={<TaskManager />} />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UserManager />
                </AdminRoute>
              }
            />
            <Route element={<PrivateRoute />}>
              <Route path="/tasks" element={<TaskManager />} />
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
