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
				if (entry.isIntersecting) {
					setIsInView(true)
					if (triggerOnce) {
						observer.unobserve(node)
					}
				} else {
					if (!triggerOnce) {
						setIsInView(false)
					}
				}
			},
			{ threshold },
		)

		observer.observe(node)

		return () => {
			if (node) observer.unobserve(node)
		}
	}, [threshold])

	return { ref, isInView }
}
