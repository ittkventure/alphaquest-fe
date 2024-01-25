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
          blue: {
            500: "#345CC1",
          },
        },

        success: {
          600: "#2c9e80",
          500: "#24B592",
        },
        secondary: {
          700: "#38405B",
          600: "#2f3138",
          500: "#71717A",
          400: "#A1A1AA",
          300: "#2d303a",
        },
        dark: {
          700: "#1c1d24",
          800: "#171B28",
          900: "#11141E",
          300: "#3F3F46",
        },
        primary: "#11141E",
        main: "#24B592",
        btn: "#E25148",
        white: "#FAFAFA",
        card: "#171B28",
        item: "rgba(255, 255, 255, 0.1)",
        gray: {
          400: "#A1A1AA",
        }
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
      keyframes: {
        slideDownAndFade: {
          "0%": {
            height: 0,
            opacity: 0,
          },
          "60%" : {
            height: "calc(80vh+10px)"
          },
          "100%" : {
            height: "80vh",
            opacity: 1,
          }
        }
      }
    },
    animation: {
      slideDownAndFade: 'slideDownAndFade 0.3s ease-in forwards'
    }
  },
  plugins: [require("@headlessui/tailwindcss")],
};
