'use client'

import { useTranslations } from 'next-intl'

export default function CalendarDesktop() {
	// const t = useTranslations('CalendarDesktop')
	return (
		<div className="wrapper anim-fade-to-b2 mx-auto w-fit">
			<div className="relative w-fit border border-4">
				<img src="/svg/calendar_desktop.svg" />
			</div>
		</div>
	)
}
