'use client'

import { useEffect, useState } from 'react'

export function useIsBreakpoint(
	breakpoint: number | ((width: number) => boolean),
): boolean {
	const [isBefore, setIsBefore] = useState<boolean>(false)

	useEffect(() => {
		if (typeof window === 'undefined') return

		const handleResize = () => {
			console.log('USE IS  BREAKPOINT', window.innerWidth, breakpoint, isBefore)
			setIsBefore(
				typeof breakpoint === 'function'
					? breakpoint(window.innerWidth)
					: window.innerWidth < breakpoint,
			)
		}

		window.addEventListener('resize', handleResize)

		handleResize()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return isBefore
}
