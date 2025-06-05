'use client'

import { useIsMobile } from '@/lib/useIsMobile'
import Skill from '../Skill'
import Review from '../Review'
import { RefObject, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useDebugCounter } from '@/lib/useDebugCounter'

const DISPATCH_MAP = {
	skill: Skill,
	review: Review,
} as const

export default function Slides({
	slides = [],
}: Partial<{
	slides: Sanity.Slide[]
}>) {
	const fullSlidesList = [...slides, ...slides, ...slides, ...slides]

	const isMobile = useIsMobile(900)
	const sliderRef = useRef<HTMLDivElement | null>(null)
	const sliderTrackRef = useRef<HTMLDivElement | null>(null)

	const startIndex = 2 * slides.length - 1

	const [currentIndex, setCurrentIndex] = useState<number>(startIndex)

	const sliderWidthRef = useRef(0)
	const cardWidthRef = useRef(0)

	const [isDragging, setIsDragging] = useState(false)
	const [transition, setTransition] = useState(false)
	const [startX, setStartX] = useState(0)
	const [disableButton, setDisableButton] = useState<boolean>(false)
	const deltaX = useRef<number>(0)
	const [direction, setDirection] = useState('')
	const [screenWidth, setScreenWidth] = useState<number>(0)

	useEffect(() => {
		if (!sliderTrackRef.current) return

		const handleTransitionEnd = () => {
			if (!sliderTrackRef.current) return

			console.log('transition ? ', currentIndex, startIndex, slides.length)

			if (
				currentIndex === startIndex - slides.length ||
				currentIndex === startIndex + slides.length
			) {
				setTimeout(() => {
					setTransition(false)
					setCurrentIndex(startIndex)
				}, 300)
			}
			console.log('transition end')
			setDisableButton(false)
		}

		sliderTrackRef.current.addEventListener(
			'transitionend',
			handleTransitionEnd,
		)
		return () => {
			sliderTrackRef.current &&
				sliderTrackRef.current.removeEventListener(
					'transitionend',
					handleTransitionEnd,
				)
		}
	}, [currentIndex])

	useEffect(() => {
		if (!transition) {
			requestAnimationFrame(() =>
				requestAnimationFrame(() => setTransition(true)),
			)
		}
	}, [transition])

	useEffect(() => {
		const slider = sliderRef.current

		if (!slider || typeof window === 'undefined') return

		const handleResize = () => {
			console.log('resizing')
			setScreenWidth(window.innerWidth)
		}

		const sliderWidth = slider.getBoundingClientRect().width

		if (sliderWidth) {
			sliderWidthRef.current = sliderWidth
		}
		const cards = Array.from(slider.querySelectorAll('.slide'))
		const cardWidth = cards[0].getBoundingClientRect().width

		if (cardWidth) {
			cardWidthRef.current = cardWidth
		}
		console.log(
			'card width',
			cardWidthRef.current,
			'slider width',
			sliderWidthRef.current,
		)

		setTransition(true)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [screenWidth])

	useEffect(() => {
		if (typeof window === 'undefined') return

		const handleMove = <T extends MouseEvent | TouchEvent>(e: any) => {
			console.log('mouse move')
			if (!isDragging) return
			const clientX = e.touches ? e.touches[0].clientX : e.clientX
			deltaX.current = clientX - startX
			console.log('mouse move', deltaX.current)
		}

		const handleEnd = (e: MouseEvent | TouchEvent) => {
			console.log('mouse up')

			if (Math.abs(deltaX.current) > 5) {
				setDirection(deltaX.current > 0 ? 'Right' : 'Left')

				if (deltaX.current > 0) {
					slideLeft()
				} else {
					slideRight()
				}
			}
			setIsDragging(false)
			deltaX.current = 0
		}

		if (isDragging) {
			window.addEventListener('mousemove', handleMove)
			window.addEventListener('touchmove', handleMove)
			window.addEventListener('mouseup', handleEnd)
			window.addEventListener('touchend', handleEnd)
		} else {
			window.removeEventListener('mousemove', handleMove)
			window.removeEventListener('touchmove', handleMove)
			window.removeEventListener('mouseup', handleEnd)
			window.removeEventListener('touchend', handleEnd)
		}

		return () => {
			window.removeEventListener('mousemove', handleMove)
			window.removeEventListener('touchmove', handleMove)
			window.removeEventListener('mouseup', handleEnd)
			window.removeEventListener('touchend', handleEnd)
		}
	}, [isDragging, startX])

	const handleStart = (e: any) => {
		const clientX = e.touches ? e.touches[0].clientX : e.clientX
		setIsDragging(true)
		setStartX(clientX)
	}
	const cardWidth = cardWidthRef.current ?? 398
	const sliderWidth = sliderRef.current?.getBoundingClientRect().width ?? 1000
	const common = (sliderTrackRef: RefObject<HTMLDivElement | null>) => {
		if (!sliderTrackRef || !sliderTrackRef.current) return

		if (
			currentIndex === startIndex + slides.length ||
			currentIndex === startIndex - slides.length
		) {
			console.log('reset slider')
		}
		sliderTrackRef.current.childNodes.forEach((node, index) => {
			const img = node as HTMLImageElement
			console.log(
				`index ${index}`,
				img.x,
				sliderTrackRef.current?.scrollLeft,
				img.offsetWidth,
				sliderTrackRef.current?.offsetWidth,
			)
		})
		setDisableButton(true)
	}

	const slideLeft = () => {
		if (!sliderTrackRef || !sliderTrackRef.current) return

		common(sliderTrackRef)

		setCurrentIndex((prev) => Math.max(prev - 1, 0))
	}

	const slideRight = () => {
		if (!sliderTrackRef || !sliderTrackRef.current) return
		common(sliderTrackRef)

		setCurrentIndex((prev) => Math.min(prev + 1, fullSlidesList.length - 1))
	}

	const translateX =
		sliderWidth / 2 - 0.5 * cardWidth - currentIndex * cardWidth
	console.log('translate x', translateX)
	console.log('cardWidth', cardWidth)
	console.log('sliderWidth', sliderWidth)
	return (
		<div
			className={cn('relative grid', {
				'grid-cols-[2.5rem_auto_2.5rem] gap-4': !isMobile,
			})}
		>
			{!isMobile && (
				<button
					onClick={slideLeft}
					className={cn(
						{
							// 'cursor-not-allowed': !currentIndex,
						},
						'aspect-square w-[2.5rem] self-center rounded-full text-white disabled:bg-[#cedced]',
					)}
					// disabled={!currentIndex}
				>
					<svg
						fill="#85aff9"
						height="42px"
						width="42px"
						version="1.1"
						id="Icons"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 32 32"
					>
						<path
							d="M21,2H11c-5,0-9,4-9,9v10c0,5,4,9,9,9h10c5,0,9-4,9-9V11C30,6,26,2,21,2z M18.7,20.3c0.4,0.4,0.4,1,0,1.4
	C18.5,21.9,18.3,22,18,22s-0.5-0.1-0.7-0.3l-5-5c-0.4-0.4-0.4-1,0-1.4l5-5c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L14.4,16L18.7,20.3z"
						/>
					</svg>
				</button>
			)}
			<div
				ref={sliderRef}
				onMouseDown={handleStart}
				onTouchStart={handleStart}
				className="relative max-w-full overflow-x-hidden"
			>
				{/* Fade Left */}
				{/* <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-gradient-to-r from-white/80 to-transparent" /> */}

				{/* Fade Right */}
				{/* <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-gradient-to-l from-white/80 to-transparent" /> */}

				<div
					ref={sliderTrackRef}
					className={cn('no-scrollbar flex w-fit', {
						'transition-transform duration-500': transition,
					})}
					style={
						{
							transform: `translateX(${translateX}px)`,
							// transform: `translateX(${x}px)`,
						} as React.CSSProperties
					}
				>
					{fullSlidesList.map((slide, i) => {
						if (!slide) return null

						const Component =
							DISPATCH_MAP[slide._type as keyof typeof DISPATCH_MAP]

						if (!Component) return null

						return (
							<div
								className={cn(
									'slide flex aspect-[0.95] w-[min(calc(100vw-1rem),24.875rem)] items-center justify-center',
									{
										'border-vistablue': currentIndex === i,
									},
								)}
								key={`slide-${slide._key}-${i}`}
							>
								<Component
									{...slide}
									starred={currentIndex === i}
									transition={transition}
								/>
							</div>
						)
					})}
				</div>
			</div>
			{!isMobile && (
				<button
					onClick={slideRight}
					className={cn(
						{
							// 'cursor-not-allowed': currentIndex == phrases.length - 1,
						},
						'aspect-[0.9] w-[2.5rem] rotate-180 self-center rounded-full text-white disabled:bg-[#cedced]',
					)}
					// disabled={currentIndex == phrases.length - 1}
				>
					<svg
						fill="#85aff9"
						height="42px"
						width="42px"
						version="1.1"
						id="Icons"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 32 32"
					>
						<path
							d="M21,2H11c-5,0-9,4-9,9v10c0,5,4,9,9,9h10c5,0,9-4,9-9V11C30,6,26,2,21,2z M18.7,20.3c0.4,0.4,0.4,1,0,1.4
	C18.5,21.9,18.3,22,18,22s-0.5-0.1-0.7-0.3l-5-5c-0.4-0.4-0.4-1,0-1.4l5-5c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L14.4,16L18.7,20.3z"
						/>
					</svg>
				</button>
			)}
		</div>
	)
}
