'use client'

import { useEffect, useRef, useState } from 'react'
export function useInView(threshold = 0.1, triggerOnce = true) {
	const ref = useRef<HTMLDivElement | null>(null)
	const [isInView, setIsInView] = useState(false)

	useEffect(() => {
		const node = ref.current
		if (!node) return

		const observer = new IntersectionObserver(
			([entry]) => {
				const isVisible = entry.isIntersecting

				if (isVisible) {
					setIsInView(true)
					if (triggerOnce) observer.disconnect()
				} else if (!triggerOnce) {
					setIsInView(false)
				}
			},
			{ threshold },
		)

		observer.observe(node)

		return () => observer.disconnect()
	}, [threshold, triggerOnce])

	return { ref, isInView }
}

export function useInViewSVG(threshold = 0.1, triggerOnce = true) {
	const ref = useRef<SVGSVGElement | null>(null)
	const [isInView, setIsInView] = useState(false)

	useEffect(() => {
		const node = ref.current
		if (!node) return

		const observer = new IntersectionObserver(
			([entry]) => {
				const isVisible = entry.isIntersecting

				if (isVisible) {
					setIsInView(true)
					if (triggerOnce) observer.disconnect()
				} else if (!triggerOnce) {
					setIsInView(false)
				}
			},
			{ threshold },
		)

		observer.observe(node)

		return () => observer.disconnect()
	}, [threshold, triggerOnce])

	return { ref, isInView }
}
