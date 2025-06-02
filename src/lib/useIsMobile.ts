'use client'

import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 640 // px

export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		if (typeof window === 'undefined') return

		const mediaQuery = window.matchMedia(query)
		setMatches(mediaQuery.matches)

		const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
		mediaQuery.addEventListener('change', listener)

		return () => mediaQuery.removeEventListener('change', listener)
	}, [query])

	return matches
}

export function useIsMobile(breakpointArg?: number): boolean {
	return useMediaQuery(`(max-width: ${breakpointArg ?? MOBILE_BREAKPOINT}px)`)
}
