'use client'

import { useTranslations } from 'next-intl'
import { useInView } from '@/lib/useInView'
import { RefObject, useCallback } from 'react'
import TileLarge from './TileLarge'
import { useDebugCounter } from '@/lib/useDebugCounter'

const config = require('./configCalendarDesktop.json')

export type DebugCounter = {
	w: number
	h: number
	top: number
}

export default function CalendarLarge() {
	const t = useTranslations('CalendarText')
	const { isInView, ref } = useInView(0.8)

	const buildTiles = useCallback(
		(config: any, translate: any) => {
			let day = 0
			const tiles = config['CalendarDesktop'].flatMap((t: any) => {
				if (!t.label) {
					day++
					return []
				}
				return [
					<TileLarge
						key={`tile-large-${t.label}`}
						day={day}
						visio={t.translate}
						text={translate(t.label)}
						hour={t.hour}
						half={t.half}
						color={t.color}
						duration={t.duration}
						breakword={t.breakword}
						anim={t.anim}
						isInView
					/>,
				]
			})
			return tiles
		},
		[isInView],
	)
	return (
		<div ref={ref} className="wrapper mx-auto w-fit">
			<div className="relative h-[781px] w-[1240px]">
				<div className="absolute top-0 left-0 w-[1240px]">
					<img src="/svg/calendar_large.svg" />
				</div>

				{buildTiles(config, t)}
			</div>
		</div>
	)
}
