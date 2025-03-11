import { Box, Text, Flex } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box as="footer" bg="neutral.500" color="black" py={8} px={8} width="100%" minH="auto">
      <Flex direction="column" justify="center" align="center">
        <Text fontSize="sm">© {new Date().getFullYear()} Todo List. All rights reserved.</Text>
      </Flex>
    </Box>
  )
}

export default Footer
