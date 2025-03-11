import { Box, Flex, Heading, IconButton, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box bg="primary.400" color="white" py={4} px={8} position="fixed" top="0" left="0" right="0">
      <Flex justify="space-between" align="center">
        <Heading size="lg">Todo List</Heading>
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
