import {type Config} from "tailwindcss";
import {nextui} from "@nextui-org/react";

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
    plugins: [nextui({
        themes: {
            light: {
                colors: {
                    primary: {
                        DEFAULT: "#74be93"
                    },
                    secondary: {
                        DEFAULT: "#2e49a6"
                    }
                }
            }
        },
    })]
} satisfies Config;
