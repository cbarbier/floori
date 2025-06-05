import { useEffect, useState, useCallback } from 'react'

interface ScrollOffsetOptions {
	max?: number
	min?: number
	speed?: number
	onMaxReached?: () => void
	lockedInitial?: boolean
}

export function useScrollOffset({
	max = 1000,
	min = 0,
	speed = 1,
	lockedInitial,
	onMaxReached,
}: ScrollOffsetOptions = {}) {
	const [offset, setOffset] = useState(0)
	const [locked, setLocked] = useState(lockedInitial)

	const handleWheel = useCallback(
		(e: WheelEvent) => {
			if (!locked) return

			console.log('USESCROLL offset', offset, locked)
			e.preventDefault()
			setOffset((prev) => {
				let next = prev + e.deltaY * speed
				next = Math.min(max, Math.max(min - 1, next))

				if (next === max || next < min) {
					if (onMaxReached) onMaxReached()
					setLocked(false)
					setOffset(next === max ? max : min)
				}

				return next
			})
		},
		[locked, max, min, speed, onMaxReached],
	)

	useEffect(() => {
		if (typeof window === 'undefined') return
		const preventScroll = (e: TouchEvent) => e.preventDefault()
		if (locked) {
			// document.body.style.overflow = 'hidden'
			const scrollBarWidth =
				window.innerWidth - document.documentElement.clientWidth
			document.body.classList.add('overflow-hidden')
			document.body.style.paddingRight = `${scrollBarWidth}px`
			window.addEventListener('wheel', handleWheel, { passive: false })
			document.addEventListener('touchmove', preventScroll, {
				passive: false,
			})
		} else {
			// document.body.style.overflow = 'auto'
			document.body.classList.remove('overflow-hidden')
			document.body.style.paddingRight = ''
			window.removeEventListener('wheel', handleWheel)
			document.removeEventListener('touchmove', preventScroll)
		}

		return () => {
			// document.body.style.overflow = 'auto'
			document.body.classList.remove('overflow-hidden')
			document.body.style.paddingRight = ''
			window.removeEventListener('wheel', handleWheel)
			document.removeEventListener('touchmove', preventScroll)
		}
	}, [locked, handleWheel])

	return {
		offset,
		setOffset,
		lockScroll: () => setLocked(true),
		unlockScroll: () => setLocked(false),
		isLocked: locked,
	}
}
