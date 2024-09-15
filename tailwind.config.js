/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7B44E1",
        secondary: "#158C6F",
        textColor: "#444B5B",
        backgroundColor: "#FBFFFD",
        green: "#48bc38",
        percentage: "#ffb100",
        error: "#e64d43",
        blue: "#1e90ff",
        smallTitle: "#173829",
        sidebarHover: "#EBFFF5",
        bgColor: "#181822"
      },
      fontFamily: {
        primary: ["Roboto", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        IBM: ["IBM Plex Serif", "sans-serif"]
      },
      boxShadow: {
        default: "3px 4px 4px 0px rgba(0, 0, 0, 0.10)"
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(102deg, #275B42 41.15%, #173829 82.14%)"
      }
    }
  },
  plugins: []
};
