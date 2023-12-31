import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import SvgIcon from '@jamescoyle/vue-icon/package.json';

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    white: '#FFFFFF',
    surface: '#EEEEEE',
    primary: '#0061A4',
    onPrimary: '#FFF3F0',
    primaryContainer: '#D1E4FF',
    onPrimaryContainer: '#001D36',
    'primary-darken-1': '#FFB74D',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
    },
  },
})

export { vuetify, SvgIcon }