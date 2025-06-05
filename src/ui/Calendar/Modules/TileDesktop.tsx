'use client'

import { cn } from '@/lib/utils'

export default function TileDesktop({
	hour = '9:00',
	text,
	day = 0,
	duration = 1,
	visio,
	half,
	color = 'blue',
	breakword = false,
	anim,
	isInView,
	offset = 0,
}: Partial<{
	hour: string
	text: string
	day: number
	duration: number
	y: number
	visio: boolean
	half: string
	color: string
	breakword: boolean
	anim?: string
	isInView: boolean
	offset: number
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
	// if (!c) return null

	const animMap: Record<string, { x: string; y: string }> = {
		fade: {
			x: '0',
			y: '0',
		},
		left: {
			x: `-${offset}px`,
			y: `-${offset}px`,
		},
		right: {
			x: `${offset}px`,
			y: `-${offset}px`,
		},
	}

	const fadeStart = 200
	const fadeEnd = 700

	const opacity =
		1 - Math.min(Math.max((offset - fadeStart) / (fadeEnd - fadeStart), 0), 1)

	const animConf = anim ? animMap[anim] : null

	const width = half !== '0' ? 56 : 113
	const height = 53 * duration + (duration > 1 ? duration * 1 : 0)
	const delta = half === '2' ? 56 : 0

	const [h, min] = hour?.split(':').map((x) => +x)
	const x = h - 9
	const baseTop = 22.5 + 56 * x + (min / 60) * 56
	const top = baseTop - (h > 13 ? 1 : 0)
	const left = delta + 169 + 112.25 * (day - 1)
	return (
		<div
			className={cn('absolute z-10 rounded-[3.14px] p-[0.296875rem]', {
				// 'anim-trans': isInView && (anim === 'left' || anim === 'right'),
				// 'anim-fade-out': isInView && anim,
			})}
			style={
				{
					borderLeft: `2px solid ${c.border}`,
					top: `${top}px`,
					left: `${left}px`,
					backgroundColor: c.bg,
					translate: `${animConf?.x} ${animConf?.y}`,
					color: c.color,
					width: `${width}px`,
					height: `${height}px`,
					...(anim ? { opacity } : {}),
					'--x': animConf?.x ?? '0',
					'--y': animConf?.y ?? '0',
					'--delay-fadeout': '500ms',
					'--delay-translate': '500ms',
				} as React.CSSProperties
			}
		>
			<div className="hour flex items-center gap-[0.395625rem]">
				<div className="title font-inter text-[0.59375rem] font-[500]">
					{hour}
				</div>
				{visio && (
					<svg
						width="10"
						height="10"
						viewBox="0 0 10 10"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect
							x="0.458374"
							width="9.5"
							height="9.5"
							rx="4.75"
							fill={c.color}
						/>
						<g clip-path="url(#clip0_597_609)">
							<path
								d="M2.67493 3.48342C2.67493 3.31545 2.74165 3.15435 2.86043 3.03558C2.9792 2.91681 3.14029 2.85008 3.30826 2.85008H5.20826C5.37623 2.85008 5.53732 2.91681 5.65609 3.03558C5.77487 3.15435 5.84159 3.31545 5.84159 3.48342V6.01675C5.84159 6.18472 5.77487 6.34581 5.65609 6.46458C5.53732 6.58336 5.37623 6.65008 5.20826 6.65008H3.30826C3.14029 6.65008 2.9792 6.58336 2.86043 6.46458C2.74165 6.34581 2.67493 6.18472 2.67493 6.01675V3.48342ZM6.65004 3.83365C6.59745 3.85993 6.55321 3.90033 6.52228 3.95033C6.49136 4.00033 6.47496 4.05796 6.47493 4.11675V5.38342C6.47496 5.44221 6.49136 5.49983 6.52228 5.54983C6.55321 5.59983 6.59745 5.64024 6.65004 5.66652L7.28338 5.98318C7.33164 6.0073 7.38527 6.01869 7.43917 6.01626C7.49308 6.01383 7.54547 5.99767 7.59137 5.96931C7.63727 5.94095 7.67517 5.90133 7.70146 5.85421C7.72775 5.80709 7.74156 5.75404 7.74159 5.70008V3.80008C7.74156 3.74613 7.72775 3.69307 7.70146 3.64595C7.67517 3.59883 7.63727 3.55921 7.59137 3.53085C7.54547 3.50249 7.49308 3.48633 7.43917 3.48391C7.38527 3.48148 7.33164 3.49286 7.28338 3.51698L6.65004 3.83365Z"
								fill="#F4EAE5"
							/>
						</g>
						<defs>
							<clipPath id="clip0_597_609">
								<rect
									width="6.33333"
									height="6.33333"
									fill="white"
									transform="translate(2.04163 1.58342)"
								/>
							</clipPath>
						</defs>
					</svg>
				)}
			</div>
			<div
				className={cn('title font-inter text-[0.59375rem] font-[600]', {
					'break-all': breakword,
				})}
			>
				{text}
			</div>
		</div>
	)
}
