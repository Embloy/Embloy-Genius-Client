/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'embloy-green-blue-gradient': 'linear-gradient(to right, #99F7CB, #99FFFF)',
        'embloy-green-blue-gradient-dark': 'linear-gradient(to right, #00FF88, #00FFFF)',
      },
      colors: {
        'embloy-green': '#99F7CB',
        'embloy-blue': '#99FFFF',
        'embloy-purple': '#3F3356',
        'embloy-purple-light': '#987ACF',
        'embloy-purple-lighter': '#C9B3FF',
        'embloy-gray-darkest': '#0f1628',
        'embloy-gray-darker': '#2c3949',
        'embloy-gray-dark': '#647488',
        'embloy-gray': '#9ca3ae',
        'embloy-gray-light': '#c0c4cb',
        'embloy-gray-lighter': '#e4e6eb',
        'embloy-gray-lightest': '#f1f5f9',
      }
    },
  },
  plugins: [nextui()],
}
