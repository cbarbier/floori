'use client'

import { cn } from '@/lib/utils'
import css from './cloud_v2.module.css'
import { useEffect, useRef, useState } from 'react'

export default function Cloud_v2({
	phrases = [],
}: Partial<{
	phrases: String[]
}>) {
	const sliderRef = useRef<HTMLDivElement>(null)
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	const cardWidthRef = useRef(0)
	const isJumpingRef = useRef(false)

	useEffect(() => {
		if (!sliderRef.current) return

		const slider = sliderRef.current
		const cards = Array.from(slider.querySelectorAll('.phrase'))
		const cardCount = cards.length

		cards.forEach((card) => {
			slider.insertBefore(card.cloneNode(true), slider.firstChild)
			slider.appendChild(card.cloneNode(true))
		})

		requestAnimationFrame(() => {
			const cardWidth = cards[0].getBoundingClientRect().width
			cardWidthRef.current = cardWidth
			slider.scrollLeft = cardWidth * cardCount
		})

		const jumpTo = (pos: number) => {
			if (!slider) return
			// Temporarily disable snapping
			slider.style.scrollSnapType = 'none'
			slider.scrollLeft = pos
			// Restore snap on next frame
			requestAnimationFrame(() => {
				slider.style.scrollSnapType = 'x mandatory'
				isJumpingRef.current = false
			})
		}

		let scrollTimeout: ReturnType<typeof setTimeout>

		const updateCurrentIndex = () => {
			const scrollLeft = slider.scrollLeft
			const cardWidth = cardWidthRef.current
			const centerOffset = cardWidth * cardCount
			const relative = scrollLeft - centerOffset
			const index = Math.round(relative / cardWidth)
			const normalized = ((index % cardCount) + cardCount) % cardCount
			setCurrentIndex(normalized)
		}

		const onScroll = () => {
			if (!slider || !cardWidthRef.current) return

			// Handle infinite scroll loop
			const scrollLeft = slider.scrollLeft
			const totalWidth = cardWidthRef.current * cardCount

			if (!isJumpingRef.current) {
				if (scrollLeft < cardWidthRef.current * 0.5) {
					isJumpingRef.current = true
					requestAnimationFrame(() => jumpTo(scrollLeft + totalWidth))
				} else if (scrollLeft > totalWidth * 2 - cardWidthRef.current * 0.5) {
					isJumpingRef.current = true
					requestAnimationFrame(() => jumpTo(scrollLeft - totalWidth))
				}
			}

			// Debounce currentIndex update
			clearTimeout(scrollTimeout)
			scrollTimeout = setTimeout(() => {
				updateCurrentIndex()
			}, 100) // adjust timeout for feel (50-150ms)
		}

		slider.addEventListener('scroll', onScroll)
		return () => slider.removeEventListener('scroll', onScroll)
	}, [])

	const scrollByCard = (offset: number) => {
		if (!sliderRef.current) return
		sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' })
	}

	const slideLeft = () => {
		scrollByCard(-cardWidthRef.current)
		// if (!sliderRef || !sliderRef.current) return
		// setCurrentIndex((prev) => Math.max(prev - 1, 0))
	}
	const slideRight = () => {
		scrollByCard(cardWidthRef.current)
		// if (!sliderRef || !sliderRef.current) return
		// setCurrentIndex((prev) => Math.min(prev + 1, phrases.length - 1))
	}
	return (
		<div className="mt-[3.4375rem] grid grid-cols-[40px_auto_40px] items-center gap-4 rounded-[1.5rem] bg-white p-3">
			<button
				onClick={slideLeft}
				className={cn(
					{
						// 'cursor-not-allowed': !currentIndex,
					},
					'bg-vistablue aspect-square w-[2.5rem] rounded-full text-white disabled:bg-[#cedced]',
				)}
				// disabled={!currentIndex}
			>
				{'◀'}
			</button>

			<div
				ref={sliderRef}
				className={cn(
					'no-scrollbar flex snap-x snap-mandatory overflow-x-auto',
				)}
				style={
					{
						// transform: `translateX(${-currentIndex * 610}px)`,
					} as React.CSSProperties
				}
			>
				{phrases?.map((phrase, i) => {
					return (
						<div
							key={'fl-cloud-phrase-' + i}
							className={cn(
								'phrase',
								'font-cdis py-3 text-[1.125rem] text-black',
								'w-full flex-shrink-0 snap-center text-center',
							)}
						>
							{phrase}
						</div>
					)
				})}
			</div>
			<button
				onClick={slideRight}
				className={cn(
					{
						// 'cursor-not-allowed': currentIndex == phrases.length - 1,
					},
					'bg-vistablue aspect-square w-[2.5rem] rounded-full text-white disabled:bg-[#cedced]',
				)}
				// disabled={currentIndex == phrases.length - 1}
			>
				{'▶'}
			</button>
		</div>
	)
}
