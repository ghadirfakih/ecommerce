// tailwind.config.js
module.exports = {
    content: [
      './src/**/*.{html,js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('tailwindcss-animate'),
    ],
  };
  