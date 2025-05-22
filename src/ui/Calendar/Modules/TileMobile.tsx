'use client'

import { cn } from '@/lib/utils'
import css from './CalendarMobile.module.css'

export default function TileMobile({
	hour = '9:00',
	end = '10:00',
	text,
	color = 'blue',
	breakword,
	anim,
	isInView,
}: Partial<{
	hour: string
	end: string
	text: string
	color: string
	breakword: boolean
	isInView: boolean
	anim?: string
}>) {
	const colorMap: Record<string, any> = {
		blue: {
			border: '#577BBC',
			color: '#0557DE',
			bg: '#0557DE1A',
		},
		red: {
			border: '#FE6641',
			color: '#FE6641',
			bg: '#FE66411A',
		},
		yellow: {
			border: '#F99F00',
			color: '#F99F00',
			bg: '#F99F001A',
		},
		brown: {
			border: '#9F4747',
			color: '#9F4747',
			bg: '#F4EAE5',
		},

		grey: {
			border: '#577BBC',
			color: '#577BBC',
			bg: '#85AFF91A',
		},
	}
	const c = colorMap[color] ?? colorMap.blue

	return (
		<div className={cn('wrapper w-full py-3', css.tile)}>
			<div
				className={cn('inner flex h-[1.875rem] w-full justify-start', {
					'anim-fade-out': color !== 'blue' && isInView,
				})}
				style={
					{
						'--x': '0',
						'--y': '0',
						'--delay-fadeout': '1s',
					} as React.CSSProperties
				}
			>
				<div
					className={cn('bordleft mr-[0.3125rem] h-full w-[2px]')}
					style={{
						backgroundColor: c.border,
					}}
				/>
				<div
					className={cn(
						'title font-inter mr-auto text-left text-[0.59375rem] font-[600]',
						{
							'break-all': breakword,
						},
					)}
				>
					{text}
				</div>
				<div className="title font-inter w-[1.625rem] text-[0.59375rem] font-[500]">
					<div className="hour text-[#230903]">{hour}</div>
					<div className="end text-[#71717A]">{hour}</div>
				</div>
			</div>
		</div>
	)
}
