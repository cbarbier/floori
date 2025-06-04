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
	const autoScrollRef = useRef<NodeJS.Timeout | null>(null)
	const userInterrupted = useRef(false)

	const cardWidthRef = useRef(0)
	const isJumpingRef = useRef(false)

	useEffect(() => {
		autoScrollRef.current = setInterval(() => {
			console.log('interval slide right')
			scrollByCard(cardWidthRef.current)
		}, 3000)

		return () => {
			if (autoScrollRef.current) clearInterval(autoScrollRef.current)
		}
	}, [])

	useEffect(() => {
		if (!sliderRef.current) return

		const slider = sliderRef.current
		const cards = Array.from(slider.querySelectorAll('.phrase'))
		const cardCount = cards.length

		cards.forEach((card, i, arr) => {
			slider.insertBefore(
				cards[arr.length - 1 - i].cloneNode(true),
				slider.firstChild,
			)
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
		if (!userInterrupted.current) {
			userInterrupted.current = true
			if (autoScrollRef.current) clearInterval(autoScrollRef.current)
		}
		scrollByCard(-cardWidthRef.current)
	}
	const slideRight = () => {
		if (!userInterrupted.current) {
			userInterrupted.current = true
			if (autoScrollRef.current) clearInterval(autoScrollRef.current)
		}
		scrollByCard(cardWidthRef.current)
	}
	return (
		<div className="bg-seashell header-w mt-[3.4375rem] grid grid-cols-[40px_auto_40px] items-center gap-4 rounded-[1.5rem] p-3">
			<button
				onClick={slideLeft}
				className={cn(
					{
						// 'cursor-not-allowed': !currentIndex,
					},
					'aspect-square w-[2.5rem] rounded-full text-white disabled:bg-[#cedced]',
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
								'font-inter py-3 text-[1.0625rem] text-black',
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
					'aspect-square w-[2.5rem] rotate-180 rounded-full text-white disabled:bg-[#cedced]',
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
		</div>
	)
}
