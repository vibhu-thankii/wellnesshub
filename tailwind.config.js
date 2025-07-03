/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#6B8E6B', // sage-green
        'primary-50': '#F0F4F0', // sage-green-50
        'primary-100': '#D4E4D4', // sage-green-100
        'primary-200': '#B8D4B8', // sage-green-200
        'primary-300': '#9CC49C', // sage-green-300
        'primary-400': '#80B480', // sage-green-400
        'primary-500': '#6B8E6B', // sage-green-500
        'primary-600': '#5A7A5A', // sage-green-600
        'primary-700': '#4A6741', // sage-green-700
        'primary-800': '#3A5331', // sage-green-800
        'primary-900': '#2A3F21', // sage-green-900
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#8B7355', // earth-brown
        'secondary-50': '#F5F3F0', // earth-brown-50
        'secondary-100': '#E8E2D8', // earth-brown-100
        'secondary-200': '#DBD1C0', // earth-brown-200
        'secondary-300': '#CEC0A8', // earth-brown-300
        'secondary-400': '#C1AF90', // earth-brown-400
        'secondary-500': '#8B7355', // earth-brown-500
        'secondary-600': '#7A6449', // earth-brown-600
        'secondary-700': '#69553D', // earth-brown-700
        'secondary-800': '#584631', // earth-brown-800
        'secondary-900': '#473725', // earth-brown-900
        'secondary-foreground': '#FFFFFF', // white

        // Accent Colors
        'accent': '#4A6741', // forest-green
        'accent-50': '#EDF2EC', // forest-green-50
        'accent-100': '#D1DFD0', // forest-green-100
        'accent-200': '#B5CCB4', // forest-green-200
        'accent-300': '#99B998', // forest-green-300
        'accent-400': '#7DA67C', // forest-green-400
        'accent-500': '#4A6741', // forest-green-500
        'accent-600': '#3F5737', // forest-green-600
        'accent-700': '#34472D', // forest-green-700
        'accent-800': '#293723', // forest-green-800
        'accent-900': '#1E2719', // forest-green-900
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#FDFCFA', // warm-white
        'surface': '#F8F6F3', // warm-gray
        'surface-50': '#FDFCFA', // warm-gray-50
        'surface-100': '#F8F6F3', // warm-gray-100
        'surface-200': '#F3F0ED', // warm-gray-200
        'surface-300': '#EEEAE7', // warm-gray-300
        'surface-400': '#E9E4E1', // warm-gray-400
        'surface-500': '#E4DEDB', // warm-gray-500

        // Text Colors
        'text-primary': '#2D3748', // charcoal
        'text-secondary': '#718096', // medium-gray
        'text-muted': '#A0AEC0', // light-gray
        'text-inverse': '#FFFFFF', // white

        // Status Colors
        'success': '#48BB78', // fresh-green
        'success-50': '#F0FDF4', // fresh-green-50
        'success-100': '#DCFCE7', // fresh-green-100
        'success-200': '#BBF7D0', // fresh-green-200
        'success-300': '#86EFAC', // fresh-green-300
        'success-400': '#4ADE80', // fresh-green-400
        'success-500': '#48BB78', // fresh-green-500
        'success-600': '#16A34A', // fresh-green-600
        'success-700': '#15803D', // fresh-green-700
        'success-800': '#166534', // fresh-green-800
        'success-900': '#14532D', // fresh-green-900
        'success-foreground': '#FFFFFF', // white

        'warning': '#ED8936', // warm-orange
        'warning-50': '#FFFBEB', // warm-orange-50
        'warning-100': '#FEF3C7', // warm-orange-100
        'warning-200': '#FDE68A', // warm-orange-200
        'warning-300': '#FCD34D', // warm-orange-300
        'warning-400': '#FBBF24', // warm-orange-400
        'warning-500': '#ED8936', // warm-orange-500
        'warning-600': '#D97706', // warm-orange-600
        'warning-700': '#B45309', // warm-orange-700
        'warning-800': '#92400E', // warm-orange-800
        'warning-900': '#78350F', // warm-orange-900
        'warning-foreground': '#FFFFFF', // white

        'error': '#E53E3E', // confident-red
        'error-50': '#FEF2F2', // confident-red-50
        'error-100': '#FEE2E2', // confident-red-100
        'error-200': '#FECACA', // confident-red-200
        'error-300': '#FCA5A5', // confident-red-300
        'error-400': '#F87171', // confident-red-400
        'error-500': '#E53E3E', // confident-red-500
        'error-600': '#DC2626', // confident-red-600
        'error-700': '#B91C1C', // confident-red-700
        'error-800': '#991B1B', // confident-red-800
        'error-900': '#7F1D1D', // confident-red-900
        'error-foreground': '#FFFFFF', // white

        // Border Colors
        'border': 'rgba(107, 142, 107, 0.12)', // sage-green-alpha
        'border-light': 'rgba(107, 142, 107, 0.08)', // sage-green-alpha-light
        'border-strong': 'rgba(107, 142, 107, 0.24)', // sage-green-alpha-strong
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Source Sans 3', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        'fluid': 'clamp(1rem, 2.5vw, 1.25rem)',
      },
      spacing: {
        'base': '16px',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'input': '8px',
        'small': '4px',
      },
      boxShadow: {
        'breathing': '0 2px 4px rgba(107, 142, 107, 0.08)',
        'breathing-hover': '0 8px 16px rgba(107, 142, 107, 0.08)',
        'soft': '0 2px 4px rgba(107, 142, 107, 0.08)',
        'soft-md': '0 4px 8px rgba(107, 142, 107, 0.08)',
        'soft-lg': '0 8px 16px rgba(107, 142, 107, 0.08)',
        'soft-xl': '0 16px 32px rgba(107, 142, 107, 0.08)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'slide-in': 'slideIn 400ms ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideIn: {
          'from': { 
            transform: 'translateX(100%)',
            opacity: '0'
          },
          'to': { 
            transform: 'translateX(0)',
            opacity: '1'
          },
        },
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}