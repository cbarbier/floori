'use client'

import { useIsMobile } from '@/lib/useIsMobile'
import type { ComponentProps } from 'react'
import CalendarDesktop from './Modules/CalendarDesktop'
import CalendarMobile from './Modules/CalendarMobile'

export default function Calendar(props: ComponentProps<'label'>) {
	const isMobile = useIsMobile(850)

	return (
		<div className="wrapper anim-fade-to-b2 mx-auto w-fit">
			{isMobile ? <CalendarMobile /> : <CalendarDesktop />}
		</div>
	)
}
