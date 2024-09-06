/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
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
        'embloy-greenish': '#9DE0CF',
        'embloy-blue': '#99FFFF',
        'embloy-purple-darkest': '#1B012D',
        'embloy-purple-blueish': '#8E69F8',
        'embloy-purple': '#3F3356',
        'embloy-purple-light': '#987ACF',
        'embloy-purple-lighter': '#C9B3FF',
        'embloy-gray-darkest': '#191919',
        'embloy-gray-darker': '#2c3949',
        'embloy-gray-dark': '#647488',
        'embloy-gray': '#9ca3ae',
        'embloy-gray-light': '#c0c4cb',
        'embloy-gray-lighter': '#e4e6eb',
        'embloy-gray-lightest': '#f1f5f9',
        'barbera': '#D2C3FC',
        'amarone': '#9482ba',
        'nebbiolo': '#3E3454',
        'biferno': '#312844',
        'aglianico': '#2B243C',
        'chianti': '#211B2E',
        'ciliegiolo': '#110E1B',

        'lagunaveneta': '#1570DB',
        'golfonapoli': '#5CA7FF',

        'leidoveneta': '#FDE961',

        'etna': '#D1D1D1',
        'vesuvio': '#787878',
        'ischia': '#374151',
        'ferrara': '#f1f5f9',

      },
      spacing : {
        '70%': '70%',
        '75%': '75%',
        '80%': '80%',
        '90%': '90%',
        '93%': '93%',
        '98%': '98%',
        '2px': '2px',
        '3px': '3px',
        '4px': '4px',
        '5px': '5px',
        '9px': '9px',
        '15px': '15px',
        '20px': '20px',
        '45px': '45px',
        '1000px': '1000px',
        '1200px': '1200px',
        '1250px': '1250px',
        '1275px': '1275px',
        '1300px': '1300px',
        '1500px': '1500px',
      }
    },
  },
  plugins: [nextui()],
}
