'use client'

import { useTranslations } from 'next-intl'
import { useCallback, useEffect } from 'react'
import TileLarge from './TileLarge'
import { cn } from '@/lib/utils'
import { useScrollOffset } from '@/lib/useScrolloffset'

import { useCenteredInView } from '@/lib/useCenteredInView'

const config = require('./configCalendarDesktop.json')

export type DebugCounter = {
	w: number
	h: number
	top: number
}

export default function CalendarLarge() {
	const t = useTranslations('CalendarText')

	const { isCentered, ref } = useCenteredInView<HTMLDivElement>()

	const { offset, lockScroll } = useScrollOffset({
		onMaxReached: () => {
			console.log('end of scroll animation')
		},
		max: 700,
	})

	useEffect(() => {
		if (isCentered) {
			lockScroll()
		}
	}, [isCentered])

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
						offset={offset}
						isInView={isCentered}
					/>,
				]
			})
			return tiles
		},
		[isCentered, offset],
	)
	return (
		<div className="wrapper mx-auto w-fit">
			<div ref={ref} className="relative h-[781px] w-[1240px]">
				<div className="absolute top-0 left-0 w-[1240px]">
					<img src="/svg/calendar_large.svg" />
				</div>

				{buildTiles(config, t)}
			</div>
		</div>
	)
}
