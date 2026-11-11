/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F8F5EF',
          50: '#FDFCF9',
          100: '#F8F5EF',
          200: '#F0ECE1',
          300: '#E6DFCEx',
        },
        gold: {
          DEFAULT: '#C6A46A',
          light: '#D8BC88',
          dark: '#AC8B52',
          muted: '#BFAF96',
          50: '#FAF7F0',
          100: '#F4ECE0',
          500: '#C6A46A',
          600: '#B08E55',
          700: '#947541',
        },
        espresso: {
          DEFAULT: '#29231F',
          light: '#3C342F',
          dark: '#1D1916',
          900: '#29231F',
        },
        beige: {
          DEFAULT: '#E9DFD0',
          light: '#F2EDE4',
          dark: '#D9CBB7',
        },
        charcoal: {
          DEFAULT: '#252525',
          light: '#3A3A3A',
          dark: '#1A1A1A',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.2em',
        widest: '0.25em',
        ultrawide: '0.3em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(41, 35, 31, 0.08)',
        'luxury-lg': '0 25px 60px -15px rgba(41, 35, 31, 0.14)',
        'gold-glow': '0 0 25px rgba(198, 164, 106, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
}

