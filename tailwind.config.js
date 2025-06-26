/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0EEFF',
          100: '#E5E0FF',
          500: '#5B4CFF',
          600: '#4A3DD9',
          700: '#3A2EB3',
        },
        secondary: {
          50: '#FFF0F0',
          100: '#FFE5E5',
          500: '#FF6B6B',
          600: '#E55252',
          700: '#CC3A3A',
        },
        accent: {
          50: '#F0FFFE',
          100: '#E5FFFD',
          500: '#4ECDC4',
          600: '#3EADA4',
          700: '#2E8D84',
        },
        success: '#51CF66',
        warning: '#FFD43B',
        error: '#FF6B6B',
        info: '#339AF0',
        surface: '#F8F9FA',
        border: '#E9ECEF',
        muted: '#6C757D'
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'large': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 0 3px rgba(91, 76, 255, 0.1)',
      }
    },
  },
  plugins: [],
}