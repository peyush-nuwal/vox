import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--white)",
        foreground: "var(--black)",
        offwhite: "var(--offwhite)",
        light: "var(--light)",
        purple: "var(--purple)",
      },
    },
  },
  plugins: [],
} satisfies Config;
