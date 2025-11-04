const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["**/*.{html, js}", "**/**/*.{html, js}", "./index.html"],
  theme: {
    extend: {
        colors: {
            primary: {
                DEFAULT: '#00ff88',
                light: '#33ffaa',
                dark: '#00cc6a',
                glow: 'rgba(0, 255, 136, 0.2)'
            },
            secondary: {
                DEFAULT: '#0066ff',
                light: '#3385ff',
                dark: '#0052cc',
                glow: 'rgba(0, 102, 255, 0.2)'
            },
            dark: {
                DEFAULT: '#0a0a0a',
                lighter: '#1a1a1a',
                border: '#333333',
                elevated: '#242424'
            },
            accent: {
                blue: '#3b82f6',
                red: '#ef4444',
                green: '#10b981',
                purple: '#a855f7',
                orange: '#f97316'
            }
        },
        fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif']
        },
        animation: {
            'glow': 'glow 2s ease-in-out infinite alternate',
            'float': 'float 3s ease-in-out infinite',
            'fade-in': 'fadeIn 0.6s ease-out forwards',
        },
        keyframes: {
            glow: {
                '0%': { boxShadow: '0 0 5px rgba(0, 255, 136, 0.2), 0 0 10px rgba(0, 255, 136, 0.1)' },
                '100%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.4), 0 0 30px rgba(0, 255, 136, 0.2)' },
            },
            float: {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-10px)' },
            },
            fadeIn: {
                '0%': { opacity: '0', transform: 'translateY(20px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
            }
        },
    }
},
  plugins: [],
}
