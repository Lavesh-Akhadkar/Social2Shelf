import flowbite from 'flowbite-react/tailwind';
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
    "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    extend: {
      colors: {
        'sidebar': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#101010', //default
        },
        'dOrange': {
          '50': '#fff8ed',
          '100': '#ffeed5',
          '200': '#fedaaa',
          '300': '#febf73',
          '400': '#fc993b',
          '500': '#fa7b15',
          '600': '#eb600b',
          '700': '#d34d0c', //default
          '800': '#9b3911',
          '900': '#7d3111',
          '950': '#431607',
        },
        'lOrange': {
          '50': '#fffceb',
          '100': '#fef4c7',
          '200': '#fce98b',
          '300': '#fbd74e',
          '400': '#fac425',
          '500': '#f2a20b', //default
          '600': '#d87c07',
          '700': '#b3570a',
          '800': '#91430f',
          '900': '#78380f',
          '950': '#451c03',
        },

        'mint-green' : '#A5FFC9',
        'nblue' : '#A5C9FF',

        'nblack': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#212121',
    },
    




      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}