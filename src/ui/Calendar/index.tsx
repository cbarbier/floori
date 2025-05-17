'use client'

import { useIsMobile } from '@/lib/useIsMobile'
import type { ComponentProps } from 'react'
import { useTranslations } from 'next-intl'
import CalendarDesktop from './Modules/CalendarDesktop'
import CalendarMobile from './Modules/CalendarMobile'

export default function Calendar(props: ComponentProps<'label'>) {
	const t = useTranslations('Calendar')
	const isMobile = useIsMobile()
	return (
		<div className="wrapper anim-fade-to-b2 mx-auto w-fit">
			<h1>{t('title')}</h1>
			{isMobile ? <CalendarMobile /> : <CalendarDesktop />}
		</div>
	)
}
