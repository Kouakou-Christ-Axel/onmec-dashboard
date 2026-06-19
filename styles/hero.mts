import { heroui } from "@heroui/react";

// Palette principale : orange (ONMEC)
const primary = {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    DEFAULT: "#f97316",
    foreground: "#ffffff",
};

export default heroui({
    themes: {
        light: {
            colors: {
                primary,
                focus: "#f97316",
            },
        },
        dark: {
            colors: {
                background: "#0C0C0C",
                primary,
                focus: "#fb923c",
            },
        },
    },
    addCommonColors: true,
    defaultTheme: "light",
});
