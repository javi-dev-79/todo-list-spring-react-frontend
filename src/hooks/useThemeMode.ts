import { useColorMode } from '@chakra-ui/react'

export function useThemeMode() {
  const { colorMode, toggleColorMode } = useColorMode()

  return { colorMode, toggleColorMode }
}
