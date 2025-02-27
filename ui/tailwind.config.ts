import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {

  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},

				// Grey shades
        'grey-800': '#080808',
        'grey-700': '#0E0E0E',
        'grey-600': '#121212',
        'grey-500': '#191919',
        'grey-400': '#2F2F2F',
        'grey-300': '#474747',
        'grey-200': '#656565',
        'grey-100': '#909090',

        // White shades
        'white/100': 'rgba(229, 229, 203)',
        'white/80': 'rgba(229, 229, 203, 0.8)',
        'white/72': 'rgba(229, 229, 203, 0.72)',
        'white/60': 'rgba(229, 229, 203, 0.6)',
        'white/32': 'rgba(229, 229, 203, 0.32)',
        'white/16': 'rgba(229, 229, 203, 0.16)',
        'white/12': 'rgba(229, 229, 203, 0.12)',
        'white/8': 'rgba(229, 229, 203, 0.08)',
        'white/4': 'rgba(229, 229, 203, 0.04)',

				// Black shades
        'black/100': 'rgba(25, 25, 25)',
        'black/80': 'rgba(25, 25, 25, 0.8)', // Note: Some values repeat in your image; adjust as needed
        'black/72': 'rgba(25, 25, 25, 0.72)',
        'black/60': 'rgba(25, 25, 25, 0.6)',
        'black/32': 'rgba(25, 25, 25, 0.32)',
        'black/16': 'rgba(25, 25, 25, 0.16)',
        'black/12': 'rgba(25, 25, 25, 0.12)',
        'black/8': 'rgba(25, 25, 25, 0.08)',
        'black/4': 'rgba(25, 25, 25, 0.04)',

				// green shades
        'green/100': 'rgba(190, 215, 84)',
        'green/80': 'rgba(190, 215, 84, 0.8)',
        'green/72': 'rgba(190, 215, 84, 0.72)',
        'green/60': 'rgba(190, 215, 84, 0.6)',
        'green/32': 'rgba(190, 215, 84, 0.32)',
        'green/16': 'rgba(190, 215, 84, 0.16)',
        'green/12': 'rgba(190, 215, 84, 0.12)',
        'green/8': 'rgba(190, 215, 84, 0.08)',
        'green/4': 'rgba(190, 215, 84, 0.04)',

        // Orange shades
        'orange/100': 'rgba(227, 143, 60)',
        'orange/80': 'rgba(227, 143, 60, 0.8)',
        'orange/72': 'rgba(227, 143, 60, 0.72)',
        'orange/60': 'rgba(227, 143, 60, 0.6)',
        'orange/32': 'rgba(227, 143, 60, 0.32)',
        'orange/16': 'rgba(227, 143, 60, 0.16)',
        'orange/12': 'rgba(227, 143, 60, 0.12)',
        'orange/8': 'rgba(227, 143, 60, 0.08)',
        'orange/4': 'rgba(227, 143, 60, 0.04)',

        // Red shades
        'red/100': '#FF0000',
        'red/80': 'rgba(255, 0, 0, 0.8)',
        'red/72': 'rgba(255, 0, 0, 0.72)',
        'red/60': 'rgba(255, 0, 0, 0.6)',
        'red/32': 'rgba(255, 0, 0, 0.32)',
        'red/16': 'rgba(255, 0, 0, 0.16)',
        'red/12': 'rgba(255, 0, 0, 0.12)',
        'red/8': 'rgba(255, 0, 0, 0.08)',
        'red/4': 'rgba(255, 0, 0, 0.04)',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
			fontFamily: {
        'pressStart': ['PressStart2P', 'sans-serif'],
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
