import { type Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#74be93",
            },
            //#2e49a6
            secondary: {
              DEFAULT: "#8c5442",
            },
            foreground: {
              DEFAULT: "#5a5a5a",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#74be93",
            },
            //#2e49a6
            secondary: {
              DEFAULT: "#74be93",
            },
            foreground: {
              DEFAULT: "#9da3ae",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
