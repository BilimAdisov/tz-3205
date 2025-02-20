/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    // [
    //   "postcss-preset-env",
    //   {
    //     "files.associations": {
    //       "*.css": "tailwindcss",
    //     },
    //   },
    // ],
  ],
};

export default config;
