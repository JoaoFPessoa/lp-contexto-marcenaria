import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
