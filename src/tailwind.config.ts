
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['var(--font-body)', 'sans-serif'],
        headline: ['var(--font-headline)', 'serif'],
        code: ['var(--font-monospace)', 'monospace'],
        teletext: ['var(--font-teletext)', 'monospace'],
        uncial: ['var(--font-uncial)', 'system-ui'],
        tabloid: ['var(--font-tabloid)', 'serif'],
        broadsheet: ['var(--font-broadsheet)', 'serif'],
        pride: ['var(--font-pride)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        keitai: ['var(--font-keitai)', 'sans-serif'],
      },
       textShadow: {
        'md': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 0.5)',
        'heavy': '4px 4px 8px rgba(0, 0, 0, 0.7)',
      },
      colors: {
        'brand-the-rack': 'hsl(var(--brand-the-rack))',
        'brand-bulletin-board': 'hsl(var(--brand-bulletin-board))',
        'brand-bookworm': 'hsl(var(--brand-bookworm))',
        'brand-the-community-post': 'hsl(var(--brand-the-community-post))',
        'brand-the-downtown-dish': 'hsl(var(--brand-the-downtown-dish))',
        'brand-the-urbanist': 'hsl(var(--brand-the-urbanist))',
        'brand-the-business-beat': 'hsl(var(--brand-the-business-beat))',
        'brand-city-soundwaves': 'hsl(var(--brand-city-soundwaves))',
        'brand-marketplace': 'hsl(var(--brand-marketplace))',
        'brand-takeouts': 'hsl(var(--brand-takeouts))',
        'brand-map-pin': 'hsl(var(--brand-map-pin))',
        'brand-tyres': 'hsl(var(--brand-tyres))',
        'brand-dlc': 'hsl(var(--brand-dlc))',
        'brand-exchange': 'hsl(var(--brand-exchange))',
        'brand-charts': 'hsl(var(--brand-charts))',
        'brand-arcade-saloon': 'hsl(var(--brand-arcade-saloon))',
        'brand-on-air': 'hsl(var(--brand-on-air))',
        'brand-broadcast': 'hsl(var(--brand-broadcast))',
        'brand-funnies': 'hsl(var(--brand-funnies))',
        'brand-weatherman': 'hsl(var(--brand-weatherman))',
        'brand-remote-control': 'hsl(var(--brand-remote-control))',
        'brand-orientations': 'hsl(var(--brand-orientations))',
        'brand-fandom-times': 'hsl(var(--brand-fandom-times))',
        'brand-tickets': 'hsl(var(--brand-tickets))',
        'brand-yeast': 'hsl(var(--brand-yeast))',
        'brand-rest-area': 'hsl(var(--brand-rest-area))',
        'brand-palapa': 'hsl(var(--brand-palapa))',
        'brand-hatay': 'hsl(var(--brand-hatay))',
        'brand-nicosia': 'hsl(var(--brand-nicosia))',
        'brand-famagusta': 'hsl(var(--brand-famagusta))',
        'brand-rendezvous': 'hsl(var(--brand-rendezvous))',
        'brand-star-chart': 'hsl(var(--brand-star-chart))',
        'brand-silver-screen': 'hsl(var(--brand-silver-screen))',
        'brand-tech-pulse': 'hsl(var(--brand-tech-pulse))',
        'brand-game-on': 'hsl(var(--brand-game-on))',
        'brand-vitality': 'hsl(var(--brand-vitality))',
        'brand-the-curator': 'hsl(var(--brand-the-curator))',
        'brand-aura': 'hsl(var(--brand-aura))',
        'brand-the-grapevine': 'hsl(var(--brand-the-grapevine))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'marquee': 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [
      require('tailwindcss-animate'),
      require('@tailwindcss/typography'),
      function ({ addUtilities, theme }: { addUtilities: any, theme: any }) {
        const newUtilities = {
          '.text-shadow': {
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
          },
          '.text-shadow-md': {
            textShadow: theme('textShadow.md'),
          },
          '.text-shadow-lg': {
            textShadow: theme('textShadow.lg'),
          },
          '.text-shadow-heavy': {
            textShadow: theme('textShadow.heavy'),
          },
          '.text-shadow-none': {
            textShadow: 'none',
          },
        }
        addUtilities(newUtilities, ['responsive', 'hover'])
      },
    ],
} satisfies Config;
