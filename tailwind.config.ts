// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {},
		extend: {
			keyframes: {
				disappear: {
					'100%': {
						opacity: '0',
						transform: 'scale(0.95)',
						visibility: 'hidden',
					},
				},
			},
			animation: {
				disappear: 'disappear 1s forwards',
			},
		},
	},
	plugins: [],
}

export default config
