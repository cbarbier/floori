'use client'

import { cn } from '@/lib/utils'
import css from './cloud_mobile.module.css'
import { useRef, useState } from 'react'

export default function Cloud_mobile({
	phrases = [],
}: Partial<{
	phrases: String[]
}>) {
	const sliderRef = useRef<HTMLDivElement>(null)
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	const slideLeft = () => {
		if (!sliderRef || !sliderRef.current) return

		setCurrentIndex((prev) => Math.max(prev - 1, 0))
	}

	const slideRight = () => {
		if (!sliderRef || !sliderRef.current) return

		setCurrentIndex((prev) => Math.min(prev + 1, phrases.length - 1))
	}
	return (
		<div className="mx-auto mt-[3.125rem] w-fit max-w-[calc(100vw-1rem)] overflow-x-hidden">
			<div className={cn(css.frame, 'overflow-x-hidden')}>
				<div
					className={cn(
						css.inner,
						'relative top-[3.1rem] mx-auto overflow-x-hidden',
					)}
				>
					<div
						ref={sliderRef}
						className={cn(
							'cards flex w-max transition-transform duration-700',
							css.slider,
						)}
						style={
							{
								transform: `translateX(${-currentIndex * 316}px)`,
							} as React.CSSProperties
						}
					>
						{phrases?.map((phrase, i) => {
							return (
								<div key={'fl-cloud-phrase-' + i}>
									<div
										className={cn(
											css.phrase,
											'font-inter text-center text-[1.125rem] text-black',
										)}
									>
										{phrase}
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
			<button
				onClick={slideLeft}
				className={cn(
					{
						'cursor-not-allowed': !currentIndex,
					},
					'bg-vistablue aspect-square w-[2.5rem] rounded-full text-white disabled:bg-[#cedced]',
				)}
				disabled={!currentIndex}
			>
				{'<'}
			</button>
			<button
				onClick={slideRight}
				className={cn(
					{
						'cursor-not-allowed': currentIndex == phrases.length - 1,
					},
					'bg-vistablue aspect-square w-[2.5rem] rounded-full text-white disabled:bg-[#cedced]',
				)}
				disabled={currentIndex == phrases.length - 1}
			>
				{'>'}
			</button>
		</div>
	)
}
