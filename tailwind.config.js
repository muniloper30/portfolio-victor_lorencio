/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#020617', // Slate 950 (Fondo principal)
          light: '#1e293b',   // Slate 800 (Para tarjetas/elementos claros)
        },
        'secondary': {
          DEFAULT: '#f8fafc', // Slate 50
        },
        'accent': {
          DEFAULT: '#e3e019ff', // Amarillo original
          hover: '#efec44ff',   // Amarillo más brillante al hover
        },
        'gray': {
          100: '#f1f5f9', // Slate 100
          200: '#e2e8f0', // Slate 200
          300: '#cbd5e1', // Slate 300
          400: '#94a3b8', // Slate 400
          500: '#64748b', // Slate 500
          600: '#475569', // Slate 600
          700: '#334155', // Slate 700
          800: '#1e293b', // Slate 800
          900: '#0f172a', // Slate 900
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
