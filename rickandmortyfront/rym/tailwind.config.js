/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        /* basic colors */
        'background-color': '#161814ff',
        'dark-color-1': '#2b2d29ff',
        'dark-color-1-5': '#363935ff',
        'dark-color-2': '#424440ff',
        'dark-color-3': '#5a5b58ff',
        'dark-color-4': '#737472ff',
        'light-color': '#8d8f8cff',

        /* palette color */
        'light-green-bright': '#c0f661ff',
        'light-green-pastel': '#c6f96bff',
        'dark-green-forest': '#304d1bff',
        'medium-green': '#68ac52ff',
        'light-green-moss': '#7bbb6bff',
        'dark-green-leaf': '#355728ff',
      },
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require('daisyui'),
  ],
}

