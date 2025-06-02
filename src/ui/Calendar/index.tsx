'use client'

import { useIsMobile } from '@/lib/useIsMobile'
import { useEffect, type ComponentProps } from 'react'
import CalendarDesktop from './Modules/CalendarDesktop'
import CalendarMobile from './Modules/CalendarMobile'
import { useIsBreakpoint } from '@/lib/useBeforeBreakpoint'
import CalendarLarge from './Modules/CalendarLarge'
import { useInView } from '@/lib/useInView'

export default function Calendar() {
	const isMobile = useIsMobile(850)
	const isLargeScreen = useIsBreakpoint((t) => t >= 1240)

	useEffect(() => {
		console.log('CALENDAR', isMobile, isLargeScreen)
	}, [isMobile, isLargeScreen])

	return (
		<div className="wrapper anim-fade-to-b2 mx-auto w-fit">
			{isLargeScreen ? (
				<CalendarLarge />
			) : isMobile ? (
				<CalendarMobile />
			) : (
				<CalendarDesktop />
			)}
		</div>
	)
}
