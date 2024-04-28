import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/*.vue',
        './src/Components/*.vue',
        './src/Components/**/*.vue',
        './src/Components/Feature/*.vue',
        './src/Components/Fragments/*.vue',
        './src/Pages/*.vue',
        './src/Pages/**/*.vue',
        './public/index.html',
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
