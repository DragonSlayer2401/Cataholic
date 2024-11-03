/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '0px', // Extra small devices (portrait phones)
        sm: '576px', // Small devices (landscape phones)
        md: '768px', // Medium devices (tablets)
        lg: '992px', // Large devices (desktops)
        xl: '1200px', // Extra large devices (large desktops)
        xxl: '1400px', // Extra extra large devices (larger desktops)
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
