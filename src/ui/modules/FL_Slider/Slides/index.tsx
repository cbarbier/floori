'use client'

import { useIsMobile } from '@/lib/useIsMobile'
import Skill from '../Skill'
import Review from '../Review'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const DISPATCH_MAP = {
	skill: Skill,
	review: Review,
} as const

export default function Slides({
	slides = [],
}: Partial<{
	slides: Sanity.Slide[]
}>) {
	const isMobile = useIsMobile(900)
	const sliderRef = useRef<HTMLDivElement>(null)
	const sliderTrackRef = useRef<HTMLDivElement | null>(null)
	const longSlides = [...slides, ...slides, ...slides]
	const startIndex = Math.floor(longSlides.length / 2)
	const [currentIndex, setCurrentIndex] = useState<number>(startIndex)
	const [transition, setTransition] = useState(true)
	const [disableButton, setDisableButton] = useState<boolean>(false)

	const [screenWidth, setScreenWidth] = useState<number>(0)

	useEffect(() => {
		const handleResize = () => {
			console.log('resizing')
			setScreenWidth(window.innerWidth)
		}

		handleResize()

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const slideLeft = () => {
		if (!sliderRef || !sliderRef.current) return

		setCurrentIndex((prev) => Math.max(prev - 1, 0))
	}

	const slideRight = () => {
		if (!sliderRef || !sliderRef.current) return

		setCurrentIndex((prev) => Math.min(prev + 1, longSlides.length - 1))
	}

	useEffect(() => {
		if (!sliderTrackRef.current) return

		const handleTransitionEnd = () => {
			if (!sliderTrackRef.current) return

			if (
				currentIndex === startIndex - slides.length ||
				currentIndex === startIndex + slides.length
			) {
				setTransition(false)
				setCurrentIndex(startIndex)
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

	const cardWidth = Math.min(screenWidth - 16, 398)

	console.log('cardWidth', cardWidth)
	console.log('transition', transition)
	console.log('currentIndex', currentIndex)
	console.log('screenWidth', screenWidth)
	return (
		<div>
			<div className="buttons mx-auto mb-4 flex w-fit gap-4">
				<button
					onClick={slideLeft}
					className={cn(
						'bg-vistablue aspect-square w-[2.5rem] rounded-full text-white disabled:bg-[#cedced]',
					)}
					disabled={disableButton}
				>
					{'<'}
				</button>
				<button
					onClick={slideRight}
					className={cn(
						'bg-vistablue aspect-square w-[2.5rem] rounded-full text-white disabled:bg-[#cedced]',
					)}
					disabled={disableButton}
				>
					{'>'}
				</button>
			</div>

			<div className="h-[23.8125rem] w-full overflow-x-hidden" ref={sliderRef}>
				<div
					ref={sliderTrackRef}
					className={cn(
						'wrapper flex h-full w-fit items-center justify-center gap-[1rem]',
						{
							'transition-transform duration-500': transition,
						},
					)}
					style={
						{
							transform: `translateX(${screenWidth / 2 - cardWidth * (currentIndex + 0.5)}px)`,
						} as React.CSSProperties
					}
				>
					{longSlides.map((slide, i) => {
						if (!slide) return null

						const Component =
							DISPATCH_MAP[slide._type as keyof typeof DISPATCH_MAP]

						if (!Component) return null

						return (
							<Component
								{...slide}
								key={slide._key + i}
								starred={currentIndex === i}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}
