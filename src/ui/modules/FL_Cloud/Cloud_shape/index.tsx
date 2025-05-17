'use client'

import { useIsMobile } from '@/lib/useIsMobile'
import Cloud_desktop from '../Cloud_desktop'
import Cloud_mobile from '../Cloud_mobile'

export default function Cloud_shape({
	phrases = [],
}: Partial<{
	phrases: String[]
}>) {
	const isMobile = useIsMobile(900)
	return isMobile ? (
		<Cloud_mobile phrases={phrases} />
	) : (
		<Cloud_desktop phrases={phrases} />
	)
}
