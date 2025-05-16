'use client'

import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 640 // px

export function useIsMobile(breakpointArg?: number): boolean {
	const breakpoint = breakpointArg ?? MOBILE_BREAKPOINT
	const [isMobile, setIsMobile] = useState<boolean>(
		typeof window !== 'undefined' ? window.innerWidth < breakpoint : false,
	)

	useEffect(() => {
		if (typeof window === 'undefined') return

		const handleResize = () => {
			setIsMobile(window.innerWidth < breakpoint)
		}

		window.addEventListener('resize', handleResize)

		handleResize()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return isMobile
}
