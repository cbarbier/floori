import { NextStudio } from 'next-sanity/studio'
import config from '$/sanity.config'

export const dynamic = 'force-static'

export const maxDuration = 60 // sec

export { viewport } from 'next-sanity/studio'

import { metadata as meta } from 'next-sanity/studio'
import { Metadata } from 'next'

export const metadata: Metadata = {
	...meta,
	icons: {
		icon: '/favicon.ico',
	},
}

export default function StudioPage() {
	return <NextStudio config={config} />
}
