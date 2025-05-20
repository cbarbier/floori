'use client'

import { cn } from '@/lib/utils'
import css from './CalendarMobile.module.css'
import { useTranslations } from 'next-intl'
import TileMobile from './TileMobile'

const config = require('./configCalendarMobile.json')

const buildTiles = (config: any, translate: any) => {
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

		// if () {

		// }
		return [
			<TileMobile
				key={`tile-mobile-${t.label}`}
				text={translate(t.label)}
				hour={t.hour}
				end={t.end}
				color={t.color}
			/>,
		]
	})
	return tiles
}

export default function CalendarMobile() {
	const t = useTranslations('CalendarText')
	return (
		<div className="wrapper anim-fade-to-b2 mx-auto w-fit">
			<div className="relative w-fit">
				<div className={cn(css.calendar)}>{buildTiles(config, t)}</div>
			</div>
		</div>
	)
}
