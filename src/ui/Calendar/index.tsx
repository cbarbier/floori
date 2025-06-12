'use client'

import { useIsMobile } from '@/lib/useIsMobile'
import { useEffect, type ComponentProps, useRef, useState } from 'react'
import CalendarDesktop from './Modules/CalendarDesktop'
import CalendarMobile from './Modules/CalendarMobile'
import { useIsBreakpoint } from '@/lib/useBeforeBreakpoint'
import CalendarLarge from './Modules/CalendarLarge'
import { useInView } from '@/lib/useInView'
import DiagonalFlower from '../animations/Flower/DiagonalFlower'
import { useCenteredInView } from '@/lib/useCenteredInView'

export default function Calendar() {
	const isMobile = useIsMobile(850)
	const isLargeScreen = useIsBreakpoint((t) => t >= 1240)
	const { isCentered, ref, isInView } = useCenteredInView<HTMLDivElement>()
	const [launch, setLaunch] = useState<boolean>(false)

	useEffect(() => {
		console.log('CALENDAR', isMobile, isLargeScreen)
	}, [isMobile, isLargeScreen])

	useEffect(() => {
		if ((!isMobile && !isCentered) || (isMobile && !isInView)) return

		setLaunch(true)
	}, [isCentered, isInView, isMobile])

	useEffect(() => {
		if (isInView) return

		setLaunch(false)
	}, [isInView])

	return (
		<div ref={ref} className="wrapper anim-fade-to-b2 relative mx-auto w-fit">
			{launch && <DiagonalFlower containerRef={ref} />}
			{isLargeScreen ? (
				<CalendarLarge isCentered={isCentered} containerRef={ref} />
			) : isMobile ? (
				<CalendarMobile containerRef={ref} isInView={isInView} />
			) : (
				<CalendarDesktop isCentered={isCentered} containerRef={ref} />
			)}
		</div>
	)
}
