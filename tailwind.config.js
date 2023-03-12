/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FAFAFA",
        primary: {
          500: "#E25148",
        },
        success: {
          500: "#24B592",
        },
        secondary: {
          700: "#38405B",
          600: "#2f3138",
          500: "#71717A",
          400: "#A1A1AA",
        },
        dark: {
          800: "#171B28",
          900: "#11141E",
        },
      },
      fontFamily: {
        workSansExtraLight: "WorkSans-ExtraLight",
        workSansLight: "WorkSans-Light",
        workSansThin: "WorkSans-Thin",
        workSansRegular: "WorkSans-Regular",
        workSansMedium: "WorkSans-Medium",
        workSansSemiBold: "WorkSans-SemiBold",
        workSansBold: "WorkSans-Bold",
        workSansBlack: "WorkSans-Black",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
