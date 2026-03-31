import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // cortextOS Gold/Mustard light theme — mirrored from dashboard globals.css light mode
        background: "oklch(0.975 0.005 80)",   // #F8F7F4 — off-white
        foreground: "oklch(0.187 0 0)",         // #1A1A1A — dark text
        card: "oklch(1 0 0)",                   // #FFFFFF — white cards
        "card-foreground": "oklch(0.187 0 0)",
        primary: "oklch(0.762 0.125 82)",       // #D4AF37 — gold accent
        "primary-foreground": "oklch(0.145 0 0)",
        secondary: "oklch(0.975 0.005 80)",     // #F8F7F4
        "secondary-foreground": "oklch(0.187 0 0)",
        muted: "oklch(0.975 0.005 80)",
        "muted-foreground": "oklch(0.478 0 0)", // #666666
        accent: "oklch(0.618 0.13 75)",         // #B8860B — dark goldenrod
        "accent-foreground": "oklch(0.187 0 0)",
        border: "oklch(0.905 0.01 70)",         // #E5E0D8 — warm light border
        input: "oklch(0.905 0.01 70)",
        ring: "oklch(0.762 0.125 82)",
        destructive: "oklch(0.577 0.245 27.325)",
        success: "oklch(0.555 0.17 145)",
        warning: "oklch(0.72 0.17 75)",
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Fira Code"', "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "0.3rem",
        DEFAULT: "0.5rem",
        md: "0.4rem",
        lg: "0.5rem",
        xl: "0.7rem",
      },
    },
  },
  plugins: [],
};

export default config;
