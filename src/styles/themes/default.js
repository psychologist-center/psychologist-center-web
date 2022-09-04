import { extendTheme } from '@chakra-ui/react'

const defaultTheme = {
  colors: {
    'base-white': '#FFFFFF',
    'base-text': '#666666',
    'base-error': '#f84747',
    'brand-black': '#131313',
    'brand-purple': '#7317E9',
    'brand-purple-hover': '#8F37FF',
    'brand-purple-dark': '#7317E9',
  },
  textSizes: {
    'title-l': '2.6rem',
    'title-m': '2rem',
    'title-s': '1.2rem',

    'text-m': '1rem',
    'text-s': '0.9rem',
  },
  fonts: {
    regular: "'Poppins'",
  },
}

const theme = extendTheme(defaultTheme)

export default theme
