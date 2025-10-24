const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["**/*.{html, js}", "**/**/*.{html, js}", "./index.html"],
  theme: {
    screens: {
      'xs': '361px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: '#00ff88',
        secondary: '#0066ff',
        dark: '#0a0a0a',
        'dark-lighter': '#1a1a1a',
        'dark-border': '#333333'
    },
    fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif']
    }
    },
  },
  plugins: [],
}
