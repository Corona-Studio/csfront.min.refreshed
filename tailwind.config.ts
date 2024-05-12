import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/*.vue',
        './src/components/*.vue',
        './src/components/Navbar.vue',
        // './src/components/**/*.vue',
        './src/components/Feature/*.vue',
        './src/components/Fragments/*.vue',
        './src/pages/*.vue',
        './src/pages/About.vue',
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
} satisfies Config;
