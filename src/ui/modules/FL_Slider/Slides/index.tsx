'use client'

import { useIsMobile } from '@/lib/useIsMobile'
import Skill from '../Skill'
import Review from '../Review'
import { useRef, useState } from 'react'

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
	const [currentIndex, setCurrentIndex] = useState<number>(
		Math.floor(slides.length / 2),
	)

	const slideLeft = () => {
		if (!sliderRef || !sliderRef.current) return

		setCurrentIndex((prev) => Math.max(prev - 1, 0))
	}

	const slideRight = () => {
		if (!sliderRef || !sliderRef.current) return

		setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1))
	}

	return (
		<div className="">
			<div
				ref={sliderRef}
				className="wrapper flex w-fit flex-wrap items-center justify-center gap-[1.4375rem]"
				style={
					{
						// transform: `translateX(${-currentIndex * 398}px)`,
					} as React.CSSProperties
				}
			>
				{slides.map((slide, i) => {
					if (!slide) return null

					const Component =
						DISPATCH_MAP[slide._type as keyof typeof DISPATCH_MAP]

					if (!Component) return null

					return (
						<Component
							key={slide._key}
							{...slide}
							starred={currentIndex === i}
						/>
					)
				})}
			</div>
		</div>
	)
}
