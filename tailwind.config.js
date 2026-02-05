/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Pystep brand colors from UI Kit
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
        secondary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          500: '#F97316',
          700: '#C2410C',
        },
        success: {
          50: '#ECFDF5',
          500: '#10B981',
          700: '#047857',
          800: '#065F46',
        },
        error: {
          50: '#FEF2F2',
          500: '#EF4444',
          700: '#B91C1C',
          800: '#991B1B',
        },
        warning: {
          50: '#FFFBEB',
          500: '#F59E0B',
          800: '#92400E',
        },
        info: {
          50: '#EFF6FF',
          500: '#3B82F6',
          800: '#1E40AF',
        },
      },
    },
  },
  plugins: [],
}
