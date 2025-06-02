'use client'

import { cn } from '@/lib/utils'
import css from './CalendarMobile.module.css'
import { useTranslations } from 'next-intl'
import TileMobile from './TileMobile'
import { useInView } from '@/lib/useInView'
import { useCallback } from 'react'

const config = require('./configCalendarMobile.json')

export default function CalendarMobile() {
	const t = useTranslations('CalendarText')
	const { isInView, ref } = useInView(1)

	const buildTiles = useCallback(
		(config: any, translate: any) => {
			let day = 0
			const tiles = config['CalendarMobile'].flatMap((t: any) => {
				if (t.DAY) {
					return [
						<div
							key={`tile-mobile-day-${day}`}
							className="font-inter text-[0.6875rem] font-[500] text-[#71717A]"
							style={{
								marginTop: day++ ? '26px' : '0px',
							}}
						>
							{translate(t.label)}
						</div>,
					]
				}
				return [
					<TileMobile
						key={`tile-mobile-${t.label}`}
						text={translate(t.label)}
						hour={t.hour}
						end={t.end}
						color={t.color}
						anim={t.anim}
						isInView={isInView}
					/>,
				]
			})

			return tiles
		},
		[isInView],
	)
	return (
		<div className="wrapper anim-fade-to-b2 mx-auto w-fit">
			<div ref={ref} className={cn('relative h-[575px] w-[320px]')}>
				<div className={cn(css.calendar)}>{buildTiles(config, t)}</div>
			</div>
		</div>
	)
}
