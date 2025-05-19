'use client'

import { useTranslations } from 'next-intl'
import TileDesktop from './TileDesktop'

const config = require('./configCalendarDesktop.json')

const buildTiles = (config: any, translate: any) => {
	let day = 0
	const tiles = config['CalendarDesktop'].flatMap((t: any) => {
		if (!t.label) {
			day++
			return []
		}

		// if () {

		// }
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
			/>,
		]
	})
	return tiles
}

export default function CalendarDesktop() {
	const t = useTranslations('CalendarText')

	return (
		<div className="wrapper anim-fade-to-b2 mx-auto w-fit">
			<div className="relative h-[543px] w-[861px]">
				<div className="absolute top-0 left-0 w-[861px]">
					<img src="/svg/calendar_desktop.svg" />
				</div>

				{buildTiles(config, t)}
				{/* <TileDesktop
					hour={'9:00'}
					top={23}
					left={58}
					visio
					text={'Diner cli'}
				/>
				<TileDesktop hour={'10:00'} top={79} left={58} text={'Dej marketing'} />
				<TileDesktop
					hour={'11:00'}
					top={135}
					left={58}
					text={'Dej marketing'}
				/>
				<TileDesktop
					hour={'10:00'}
					top={79}
					left={172}
					text={'Dej marketing'}
				/> */}
			</div>
		</div>
	)
}
