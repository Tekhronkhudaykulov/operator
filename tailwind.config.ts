/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        body: "#E5F3FD",
        footer: "#2A2B36",
        purple: "#5960FE",
        darkPurple: '#000D84',
        lightPurple: "rgba(89, 96, 254, 0.13)",
        red: "#FF0000",
        gray: "#B5B5B5",
        textGray: "#D9D9D9",
        warning: "#FF1F1F",
        green: "#22BC79",
        textGreen: '#409C14',
      },
      borderRadius: {
        main: "11px",
        content: "18px",
        swiper: "15px",
        search: "31px",
        button: "16px",
      },
      boxShadow: {
        box: "0px 0px 8.399999618530273px 0px #5960FE5E",
        navbar: "0px 2px 7.599999904632568px -2px #5960FE",
        button: "0px 0px 8.399999618530273px 0px #00000040",
        swiper: "3px 4px 8.100000381469727px -1px #5960FE",
        login: '0px 0px 8.399999618530273px 0px #BEBEBE5E',
      },
    },
  },
  plugins: [],
};

