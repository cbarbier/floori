import { useEffect, useRef, useState } from 'react'

export function useCenteredInView<T extends HTMLElement>(threshold = 20) {
	const ref = useRef<T | null>(null)
	const [isCentered, setIsCentered] = useState(false)
	const [isInView, setIsInView] = useState(false)
	const rafId = useRef<number | null>(null)

	useEffect(() => {
		const node = ref.current
		if (!node || typeof window === 'undefined') return

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsInView(entry.isIntersecting)
			},
			{
				root: null,
				threshold: 0.4,
			},
		)

		observer.observe(node)

		return () => observer.unobserve(node)
	}, [])

	useEffect(() => {
		if (!isInView || typeof window === 'undefined') return

		const checkCenter = () => {
			console.log('check foor the center')
			const node = ref.current
			if (!node) return

			const rect = node.getBoundingClientRect()
			const elementCenter = rect.top + rect.height / 2
			const viewportCenter = window.innerHeight / 2

			const offset = Math.abs(elementCenter - viewportCenter)
			setIsCentered(offset <= threshold)
			rafId.current = requestAnimationFrame(checkCenter)
		}

		rafId.current = requestAnimationFrame(checkCenter)

		return () => {
			if (rafId.current) cancelAnimationFrame(rafId.current)
		}
	}, [isInView, threshold])

	return { ref, isCentered, isInView }
}
