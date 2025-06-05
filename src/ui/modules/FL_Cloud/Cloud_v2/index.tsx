'use client'

import { cn } from '@/lib/utils'
import css from './cloud_v2.module.css'
import { useEffect, useRef, useState } from 'react'

export default function Cloud_v2({
	phrases = [],
}: Partial<{
	phrases: String[]
}>) {
	const trackRef = useRef<HTMLDivElement>(null)
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const autoScrollRef = useRef<NodeJS.Timeout | null>(null)
	const [transition, setTransition] = useState<boolean>(false)
	const userInterrupted = useRef(false)
	const cardWidthRef = useRef(0)
	const isJumpingRef = useRef(false)

	const totalPhrases = phrases.length
	const extendedPhrases = [phrases[totalPhrases - 1], ...phrases, phrases[0]]

	const slideTo = (index: number, smooth = true) => {
		if (trackRef.current) {
			if (!trackRef.current) return
			trackRef.current.style.transition = smooth
				? 'transform 0.5s ease'
				: 'none'
			trackRef.current.style.transform = `translateX(-${index * 100}%)`
		}
	}

	const handleNext = () => setCurrentIndex((prev) => prev + 1)
	const handlePrev = () => setCurrentIndex((prev) => prev - 1)

	useEffect(() => {
		slideTo(currentIndex)
	}, [currentIndex])

	const handleTransitionEnd = () => {
		setTransition(false)
		if (currentIndex === totalPhrases + 1) {
			setCurrentIndex(1)
			slideTo(1, false)
		} else if (currentIndex === 0) {
			setCurrentIndex(totalPhrases)
			slideTo(totalPhrases, false)
		}
	}

	useEffect(() => {
		autoScrollRef.current = setInterval(() => {
			console.log('interval slide right')
		}, 3000)

		return () => {
			if (autoScrollRef.current) clearInterval(autoScrollRef.current)
		}
	}, [])

	const slideLeft = () => {
		if (transition) return
		setTransition(true)
		if (!userInterrupted.current) {
			userInterrupted.current = true
			if (autoScrollRef.current) clearInterval(autoScrollRef.current)
		}
		handleNext()
	}
	const slideRight = () => {
		if (transition) return
		setTransition(true)
		if (!userInterrupted.current) {
			userInterrupted.current = true
			if (autoScrollRef.current) clearInterval(autoScrollRef.current)
		}
		handlePrev()
	}

	console.log('currentIndex', currentIndex)
	return (
		<>
			<div className="bg-seashell header-w mt-[3.4375rem] grid grid-cols-[40px_auto_40px] items-center gap-4 rounded-[1.5rem] p-3">
				<button
					onClick={slideLeft}
					className={cn(
						{
							// 'cursor-not-allowed': !currentIndex,
						},
						'aspect-square w-[2.5rem] rounded-full text-white disabled:bg-[#cedced]',
					)}
					disabled={transition}
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

				<div className="slider w-full overflow-x-hidden">
					<div
						ref={trackRef}
						className={cn('flex w-full')}
						onTransitionEnd={handleTransitionEnd}
						style={
							{
								transform: `translateX(-100%)`,
							} as React.CSSProperties
						}
					>
						{extendedPhrases?.map((phrase, i) => {
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
				</div>
				<button
					onClick={slideRight}
					className={cn(
						{
							// 'cursor-not-allowed': currentIndex == phrases.length - 1,
						},
						'aspect-square w-[2.5rem] rotate-180 rounded-full text-white disabled:bg-[#cedced]',
					)}
					disabled={transition}
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
		</>
	)
}
