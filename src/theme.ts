import { extendTheme } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('white', 'gray.800')(props),
        color: mode('gray.800', 'whiteAlpha.900')(props)
      }
    })
  },
  colors: {
    primary: {
      50: '#D7FFF1',
      100: '#AAFCB8',
      200: '#8CD790',
      300: '#77AF9C',
      400: '#285943'
    },
    danger: {
      500: '#af0e33'
    },
    warning: {
      500: '#745107'
    },
    neutral: {
      500: '#CCCCCC'
    },
    update: {
      500: '#0f56ae'
    }
  }
})

export default theme

