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
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const [visualIndex, setVisualIndex] = useState<number>(0)

	const cardWidthRef = useRef(0)
	const isJumpingRef = useRef(false)

	const fullSlidesList = [...slides, ...slides, ...slides]

	const scrollToInitial = () => {
		const slider = sliderRef.current
		if (!slider) return

		const allCards = slider.children
		const target = allCards[slides.length] as HTMLElement // first original card
		if (!target) return

		const sliderCenter = slider.offsetWidth / 2
		const cardCenter = target.offsetLeft + target.offsetWidth / 2
		slider.scrollLeft = cardCenter - sliderCenter
	}

	useEffect(() => {
		if (!sliderRef.current) return

		const slider = sliderRef.current
		const cards = Array.from(slider.querySelectorAll('.slide'))
		const cardCount = cards.length

		requestAnimationFrame(() => {
			const cardWidth = cards[0].getBoundingClientRect().width
			cardWidthRef.current = cardWidth
			slider.scrollLeft = cardWidth * cardCount
		})

		let scrollTimeout: ReturnType<typeof setTimeout>

		const updateCurrentIndex = () => {
			const slider = sliderRef.current
			const cards = slider?.children
			if (!slider || !cards) return

			const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2

			let closestIndex = 0
			let minDistance = Infinity

			for (let i = 0; i < cards.length; i++) {
				const card = cards[i] as HTMLElement
				const cardCenter = card.offsetLeft + card.offsetWidth / 2
				const distance = Math.abs(cardCenter - sliderCenter)

				if (distance < minDistance) {
					minDistance = distance
					closestIndex = i
				}
			}

			// Map to original list
			const normalized = ((closestIndex % cardCount) + cardCount) % cardCount

			setCurrentIndex(normalized)
			if (!isJumpingRef.current) {
				setVisualIndex(normalized)
			}
		}

		const onScroll = () => {
			const slider = sliderRef.current
			if (!slider || !cardWidthRef.current || isJumpingRef.current) return

			const fullWidth = slider.scrollWidth
			const visibleWidth = slider.offsetWidth
			const totalSetWidth = cardWidthRef.current * cardCount

			// Near start
			if (slider.scrollLeft <= totalSetWidth * 0.3) {
				isJumpingRef.current = true
				slider.style.scrollSnapType = 'none'
				// slider.scrollLeft += totalSetWidth

				requestAnimationFrame(() => {
					slider.style.scrollSnapType = 'x mandatory'
					isJumpingRef.current = false
				})
			}

			// Near end
			else if (
				slider.scrollLeft + visibleWidth >=
				fullWidth - totalSetWidth * 0.3
			) {
				isJumpingRef.current = true
				slider.style.scrollSnapType = 'none'
				// slider.scrollLeft -= totalSetWidth
				//
				requestAnimationFrame(() => {
					slider.style.scrollSnapType = 'x mandatory'
					isJumpingRef.current = false
				})
			}

			// Debounce currentIndex update
			clearTimeout(scrollTimeout)
			scrollTimeout = setTimeout(() => {
				updateCurrentIndex()
			}, 150) // adjust timeout for feel (50-150ms)
		}

		slider.addEventListener('scroll', onScroll)
		return () => slider.removeEventListener('scroll', onScroll)
	}, [])

	useEffect(() => {
		setTimeout(scrollToInitial, 0)
	}, [])

	const scrollByCard = (dir: 'left' | 'right') => {
		const slider = sliderRef.current
		if (!slider || isJumpingRef.current) return

		const card = slider.children[0] as HTMLElement
		const cardWidth = card.offsetWidth
		const totalSetWidth = cardWidth * slides.length

		const nearStart = slider.scrollLeft <= totalSetWidth * 0.3
		const nearEnd =
			slider.scrollLeft + slider.offsetWidth >=
			slider.scrollWidth - totalSetWidth * 0.3

		if (nearStart || nearEnd) {
			isJumpingRef.current = true
			slider.style.scrollSnapType = 'none'

			// Jump first
			if (nearStart) {
				// slider.scrollLeft += totalSetWidth
			} else if (nearEnd) {
				// slider.scrollLeft -= totalSetWidth
			}

			requestAnimationFrame(() => {
				slider.style.scrollSnapType = 'x mandatory'
				isJumpingRef.current = false

				// Scroll by card AFTER jump completes
				slider.scrollBy({
					left: dir === 'left' ? -cardWidth : cardWidth,
					behavior: 'smooth',
				})
			})
		} else {
			// Normal scroll
			slider.scrollBy({
				left: dir === 'left' ? -cardWidth : cardWidth,
				behavior: 'smooth',
			})
		}
	}

	const slideLeft = () => {
		scrollByCard('left')
	}
	const slideRight = () => {
		scrollByCard('right')
	}

	return (
		<div className="grid grid-cols-[2.5rem_auto_2.5rem]">
			<button
				onClick={slideLeft}
				className={cn(
					{
						// 'cursor-not-allowed': !currentIndex,
					},
					'bg-vistablue aspect-square w-[2.5rem] self-center rounded-full text-white disabled:bg-[#cedced]',
				)}
				// disabled={!currentIndex}
			>
				{'◀'}
			</button>
			<div className="relative">
				{/* Fade Left */}
				{/* <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-gradient-to-r from-white/80 to-transparent" /> */}

				{/* Fade Right */}
				{/* <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-gradient-to-l from-white/80 to-transparent" /> */}

				<div
					ref={sliderRef}
					className="no-scrollbar flex w-full snap-x snap-mandatory overflow-x-auto"
				>
					{fullSlidesList.map((slide, i) => {
						if (!slide) return null

						const Component =
							DISPATCH_MAP[slide._type as keyof typeof DISPATCH_MAP]

						if (!Component) return null

						return (
							<Component
								{...slide}
								key={`slide-${slide._key}-${i}`}
								starred
								className={cn('slide snap-center', {
									// 'bg-black': visualIndex === i,
									'scale-90': !isMobile && visualIndex !== i,
								})}
							/>
						)
					})}
				</div>
			</div>
			<button
				onClick={slideRight}
				className={cn(
					{
						// 'cursor-not-allowed': currentIndex == phrases.length - 1,
					},
					'bg-vistablue aspect-square w-[2.5rem] self-center rounded-full text-white disabled:bg-[#cedced]',
				)}
				// disabled={currentIndex == phrases.length - 1}
			>
				{'▶'}
			</button>
		</div>
	)
}
