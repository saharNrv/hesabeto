/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend:{
    colors: {
      'shamrock': {
        '50': '#eefbf5',
        '100': '#d5f6e5',
        '200': '#afebd0',
        '300': '#7bdab5',
        '400': '#4ac499',
        '500': '#22a77d',
        '600': '#148764',
        '700': '#106c53',
        '800': '#0f5643',
        '900': '#0e4638',
        '950': '#062820',
    },
    'steel-blue': {
        '50': '#f2f7fc',
        '100': '#e2edf7',
        '200': '#cbe0f2',
        '300': '#a8cde8',
        '400': '#7eb2dc',
        '500': '#5f97d2',
        '600': '#4a7dc4',
        '700': '#416bb4',
        '800': '#3a5893',
        '900': '#334b75',
        '950': '#232f48',
    },
    
  }
    },
  },
  plugins: [],
};
