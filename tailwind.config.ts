import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{mdx,md}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(0 0% 90%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 84% 4.9%)",
        muted: "hsl(210 40% 96.1%)",
        primary: {
          DEFAULT: "#111827",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        xl: '0',
        '2xl': '0'
      },
      boxShadow: {
        soft: '0 6px 24px rgba(0,0,0,0.06)'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config

