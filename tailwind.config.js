/** @type {import('tailwindcss').Config} */
// const inherit = require('tailwindcss/colors');

module.exports = {
    content: [
        './src/*.vue',
        './src/components/*.vue',
        './src/components/Navbar.vue',
        // './src/components/**/*.vue',
        './src/components/Feature/*.vue',
        './src/components/Fragments/*.vue',
        './src/pages/*.vue',
        // './src/pages/**/*.vue',
        './public/index.html',
        './index.html',
    ],
    theme: {
        extend: {
            colors: {
                cosloto: '#ffb900',
                'cosloto-dark': '#EAA919',
                'cosloto-base': '#FDC911',
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};
