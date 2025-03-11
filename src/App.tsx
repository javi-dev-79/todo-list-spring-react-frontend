import { Box, Text } from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex="1" p={5} display="flex" alignItems="center" justifyContent="center">
        <Text fontSize="2xl" fontWeight="bold">
          Home
        </Text>
      </Box>
      <Footer />
    </Box>
  )
}

export default App
