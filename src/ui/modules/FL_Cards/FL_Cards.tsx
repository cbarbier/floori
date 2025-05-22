'use client'

import moduleProps from '@/lib/moduleProps'
import { PortableText, stegaClean } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'
import Calendar from '@/ui/Calendar'
import CustomPortableText from '../RichtextModule/CustomPortableText'
import css from './FL_Cards.module.css'
import { useEffect, useRef } from 'react'
import Flowers from './Flowers'
import { useIsMobile } from '@/lib/useIsMobile'
import './cards.css'

export default function FL_Cards({
	title,
	subtitle,
	cta,
	cards,
	...props
}: Partial<{
	title: any
	subtitle: any
	cards: Sanity.Card[]
	cta: Sanity.CTA
}> &
	Sanity.Module) {
	const isMobile = useIsMobile()
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!ref.current) return

		const targetSpans = document.querySelectorAll(
			'#cardtitle *:first-child span:first-of-type',
		)
		const targetSpan = targetSpans[0]
		console.log(targetSpan, targetSpan.clientTop)

		if (targetSpan && targetSpan.parentNode) {
			const wrapper = document.createElement('span')
			wrapper.style.position = 'relative'
			wrapper.style.display = 'inline-block'

			const ret = targetSpan.parentNode.insertBefore(ref.current, targetSpan)
			// wrapper.appendChild(targetSpan)
			console.log(ret)
		}
	})

	useEffect(() => {
		const targetSpans = document.querySelectorAll(
			'#cardtitle *:last-child span:last-of-type',
		)

		if (!targetSpans) return

		const targetSpan = targetSpans[targetSpans.length - 1]
		console.log(targetSpan)
		if (targetSpan && targetSpan.parentNode) {
			const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
			const spanWidth = Math.ceil(
				targetSpan.getBoundingClientRect().width,
			).toString()
			svg.setAttribute('width', spanWidth)
			svg.setAttribute('height', '39')
			svg.setAttribute('view-box', `0 0 ${spanWidth} 39`)
			svg.setAttribute('fill', 'none')
			svg.classList.add(
				'relative',
				'z-10',
				'top-3',
				'sm:top-6',
				'left-[135px]',
				'sm:left-[167px]',
			)
			svg.innerHTML = `
			<mask id="draw-mask2">
			<rect
				x="0"
				y="0"
				width="0"
				height="50"
				fill="white"
				id="mask-rect2"
			/>
		</mask>
		<path fill-rule="evenodd" clip-rule="evenodd" d="M23.2895 2.88474C26.6315 3.81412 30.1304 4.28296 33.5246 4.71246C34.2557 4.8025 34.9344 4.30004 34.9867 3.59213C35.0911 2.88371 34.5686 2.23583 33.8898 2.14579C30.6 1.73233 27.2061 1.28989 24.0208 0.395171C23.3419 0.201118 22.6105 0.600603 22.4017 1.28781C22.1928 1.9745 22.6106 2.69017 23.2895 2.88474Z" fill="#230903"
		mask="url(#draw-mask2)"
		/>
		<path fill-rule="evenodd" clip-rule="evenodd" d="M13.1595 16.0612C18.538 21.5004 24.5954 26.2395 29.8695 31.8246C30.3394 32.3462 31.1749 32.3741 31.6971 31.8872C32.2193 31.3997 32.2713 30.5801 31.7491 30.0584C26.475 24.4573 20.4177 19.7027 15.0392 14.2475C14.517 13.7383 13.6817 13.7311 13.1595 14.232C12.6895 14.7324 12.6373 15.552 13.1595 16.0612Z" fill="#230903"
		mask="url(#draw-mask2)"
		/>
		<path fill-rule="evenodd" clip-rule="evenodd" d="M3.08056 36.9823C2.9239 33.8691 2.76755 30.756 2.6109 27.6423C2.6109 26.9293 1.98397 26.3787 1.25291 26.4133C0.521846 26.4485 -3.40605e-05 27.0555 -3.41229e-05 27.7691C0.156621 30.8874 0.312971 34.0052 0.469627 37.123C0.521845 37.8361 1.14857 38.3831 1.87963 38.3442C2.55847 38.3054 3.13278 37.6948 3.08056 36.9823Z" fill="#230903"
				 mask="url(#draw-mask2)"
				 />

			`

			const wrapper = document.createElement('span')
			wrapper.style.position = 'relative'
			wrapper.style.display = 'inline-block'

			targetSpan.parentNode.insertBefore(wrapper, targetSpan)
			wrapper.appendChild(targetSpan)
			wrapper.appendChild(svg)

			svg.style.position = 'absolute'
			svg.style.pointerEvents = 'none'
		}
	}, [])

	useEffect(() => {
		const targetSpans = document.querySelectorAll(
			'#cardsubtitle span:last-of-type',
		)

		if (!targetSpans || targetSpans.length === 0) return

		const targetSpan = targetSpans[targetSpans.length - 1]
		console.log(targetSpan)
		if (targetSpan && targetSpan.parentNode?.parentNode) {
			const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
			const spanWidth = Math.ceil(
				targetSpan.getBoundingClientRect().width,
			).toString()
			svg.setAttribute('width', spanWidth)
			svg.setAttribute('height', '16')
			svg.setAttribute('viewBox', `0 0 ${spanWidth} 16`)
			svg.setAttribute('fill', 'none')
			// svg.classList.add('relative', 'z-10', 'top-3', 'sm:top-6')
			svg.innerHTML = `
				<mask id="draw-mask3">
				<rect
					x="0"
					y="0"
					width="0"
					height="50"
					fill="white"
					id="mask-rect3"
				/>
			</mask>
			<g style="mix-blend-mode:plus-darker">
	<path fillRule="evenodd" clipRule="evenodd" d="M65.8511 8.4946C87.6766 8.22819 109.513 7.17131 131.243 5.28218C141.575 4.38385 153.572 4.49615 163.592 1.43347C164.092 1.27934 163.997 0.816963 163.986 0.770726C163.964 0.676049 163.873 0.361209 163.476 0.345797C163.433 0.343595 163.128 0.387632 163.011 0.403045C160.052 0.799367 157.104 1.26171 154.143 1.63601C143.92 2.93286 133.666 3.91266 123.398 4.77135C109.768 5.91187 96.0216 6.51959 82.3553 6.99517C74.8748 7.25498 67.2149 6.90931 59.7107 7.44655C56.9549 7.46196 54.1992 7.46412 51.4434 7.45531C39.9233 7.41347 28.4162 6.96872 16.9156 6.35882C13.2175 6.16286 10.3969 5.95149 6.77664 5.80837C5.40201 5.75333 3.22119 5.71589 1.70392 5.69167C1.48129 5.68727 0.912858 5.68291 0.677262 5.68071C0.653489 5.6763 0.629701 5.6763 0.603761 5.6763C0.512986 5.6763 0.469773 5.68291 0.461137 5.68291C-0.0532676 5.75997 -0.00573651 6.25536 0.0072182 6.33022C0.00938494 6.34563 0.0871742 6.76398 0.530259 6.7794C0.63617 6.7838 1.39482 6.78816 1.68662 6.79256C3.19525 6.81679 5.36739 6.85422 6.73554 6.90706C10.3493 7.05018 13.1678 7.26155 16.8594 7.45751C28.3773 8.06741 39.9017 8.51437 51.4391 8.5562C52.8483 8.56061 54.2597 8.56281 55.6689 8.56061C55.7165 8.68611 55.8224 8.82702 56.0558 8.88867C56.2741 8.94592 57.8368 8.99656 58.4398 9.0472C62.903 9.4215 62.7712 9.40389 67.6818 9.70994C75.119 10.1745 76.2516 10.2802 83.9872 10.4762C98.0382 10.8329 112.096 10.8042 126.149 10.769C133.087 10.7492 140.516 10.2714 147.559 11.1631C145.238 11.4406 142.908 11.6431 140.583 11.8743C132.642 12.6626 124.694 13.1514 116.721 13.4949C97.5951 14.3183 78.4389 14.6464 59.3195 13.5234C63.3893 13.4838 67.457 13.3914 71.5269 13.3319C88.0937 13.0853 104.821 13.2703 121.353 11.991C121.649 11.9668 121.872 11.7026 121.85 11.401C121.828 11.0971 121.567 10.8703 121.271 10.8923C104.76 12.1716 88.057 11.9844 71.5117 12.231C65.3648 12.3213 59.22 12.4842 53.0731 12.4358C50.9636 12.4182 48.8541 12.3389 46.7446 12.3125C46.3275 12.3059 45.2533 12.2222 45.0998 12.2574C44.7605 12.3345 44.687 12.5899 44.6654 12.7154C44.6546 12.7903 44.62 13.2218 45.1387 13.3759C48.6791 14.4284 55.2129 14.38 58.6537 14.5869C78.0088 15.7539 97.4027 15.428 116.766 14.5957C124.759 14.2501 132.726 13.759 140.688 12.9686C143.47 12.6934 146.258 12.4556 149.029 12.0901C149.477 12.0306 150.482 11.9448 150.968 11.8545C151.171 11.8171 151.318 11.7642 151.383 11.7268C151.636 11.5815 151.681 11.3701 151.681 11.227C151.683 11.1169 151.638 10.7294 151.108 10.6237C143.04 9.01421 134.261 9.6461 126.147 9.66812C112.102 9.70335 98.0555 9.73201 84.0131 9.37532C76.297 9.17936 75.1688 9.07583 67.7466 8.61125C67.0139 8.56721 66.3936 8.52763 65.8511 8.4946Z"
	fill="black" fillOpacity="0.5"
	mask="url(#draw-mask3)"
	/>
	</g>
				`

			const wrapper = document.createElement('span')
			wrapper.style.position = 'relative'
			wrapper.style.display = 'inline-block'

			targetSpan.parentNode.insertBefore(wrapper, targetSpan)
			wrapper.appendChild(svg)

			svg.style.position = 'absolute'
			svg.style.pointerEvents = 'none'
		}
	})

	return (
		<section className={cn('')} {...moduleProps(props)}>
			<div className="section mx-auto flex w-fit flex-col text-balance">
				<div
					className={cn('richtext m-automax-w-xl relative isolate text-center')}
				>
					<div id="cardtitle" className="relative mb-[1.25rem] sm:mb-[1.5rem]">
						<CustomPortableText value={title} />
					</div>
					<div
						id="cardsubtitle"
						className="font-inter mb-[2.875rem] sm:mb-[4.375rem]"
					>
						<CustomPortableText value={subtitle} />
					</div>
				</div>
				<div
					ref={ref}
					className={cn(
						'relative right-[1.5rem] bottom-[1.5rem] inline-block w-fit max-sm:top-[10rem]',
					)}
				>
					<Flowers />
				</div>
				<div className="cards mx-auto mb-[2.375rem] flex w-fit flex-wrap justify-center gap-[1.25rem] sm:mb-[3.6875rem] sm:gap-[1.375]">
					{cards?.map((c, i) => {
						// <Card key={'fl-card-' + i} data={c} />
						const cardClass =
							'font-cdis px-8 text-[1.375rem] font-semibold sm:text-[1.75rem]'
						return (
							<div key={'fl-card-' + i}>
								<div className="perspective group aspect-square w-[min(calc(100vw-2rem),21.9375rem)] text-center sm:w-[25rem]">
									{/* The inner card flips when the parent group is hovered */}
									<div
										className={cn(
											'transform-style preserve-3d relative h-full w-full delay-0 group-hover:rotate-y-180',
											css.flipcard,
										)}
									>
										<div className="bg-creamy absolute flex h-full w-full items-center justify-center rounded-[2.5rem] border border-[#D1BCB2] text-black backface-hidden">
											<div className={cn(cardClass)}>{c.front}</div>
										</div>
										<div
											className="absolute flex h-full w-full rotate-y-180 transform flex-col items-center justify-center rounded-[2.5rem] border border-[#D1BCB2] text-white backface-hidden"
											style={{
												backgroundColor: c.color.hex,
											}}
										>
											<div className={cn(cardClass)}>{c.front}</div>
											<CustomPortableText value={c.back} />
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				{cta && <CTAList ctas={[cta]} className={cn('!mt-4 justify-center')} />}
			</div>
		</section>
	)
}
