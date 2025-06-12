'use client'

import { useTranslations } from 'next-intl'
import TileDesktop from './TileDesktop'
import { useInView } from '@/lib/useInView'
import { RefObject, useCallback, useEffect } from 'react'
import { useCenteredInView } from '@/lib/useCenteredInView'
import { useScrollOffset } from '@/lib/useScrolloffset'

const config = require('./configCalendarDesktop.json')

export default function CalendarDesktop({
	isCentered,
	containerRef,
}: {
	isCentered: boolean
	containerRef: React.RefObject<HTMLDivElement | null>
}) {
	const t = useTranslations('CalendarText')

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
					<TileDesktop
						key={`tile-desktop-${t.label}`}
						day={day}
						visio={t.translate}
						text={translate(t.label)}
						hour={t.hour}
						half={t.half}
						color={t.color}
						duration={t.duration}
						breakword={t.breakword}
						anim={t.anim}
						isInView={isCentered}
						offset={offset}
					/>,
				]
			})
			return tiles
		},
		[isCentered, offset],
	)
	return (
		<div className="wrapper mx-auto w-fit">
			<div ref={containerRef} className="relative h-[543px] w-[861px]">
				<div className="absolute top-0 left-0 w-[861px]">
					<img src="/svg/calendar_desktop.svg" />
				</div>
				{buildTiles(config, t)}
			</div>
		</div>
	)
}
