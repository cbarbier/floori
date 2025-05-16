'use client'

import { useIsMobile } from '@/lib/useIsMobile'
import type { ComponentProps } from 'react'
import { useTranslations } from 'next-intl'

export default function Calendar(props: ComponentProps<'label'>) {
	const t = useTranslations('Calendar')
	const isMobile = useIsMobile()
	return (
		<div className="wrapper anim-fade-to-b2 mx-auto w-fit">
			<h1>{t('title')}</h1>
			<img
				src={
					isMobile ? '/svg/calendar_mobile.svg' : '/svg/calendar_desktop.svg'
				}
			/>
		</div>
	)
}
