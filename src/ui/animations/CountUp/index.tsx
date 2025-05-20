'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { easeOutCubic } from '../easinfFuncs'
import { countDecimals } from '@/lib/utils'
import { useInView } from '@/lib/useInView'

interface CountUpProps {
	to: number
	duration?: number
	easingFn?: (t: number) => number
}

export function CountUp({
	to,
	duration = 1000,
	easingFn = easeOutCubic,
}: CountUpProps) {
	const { ref, isInView } = useInView()
	const [count, setCount] = useState(0)
	const start = useRef<number | null>(null)
	const decimals = useMemo(() => countDecimals(to), [])

	useEffect(() => {
		let animationFrame: number

		if (!isInView) {
			setCount(0)
			if (start.current) {
				start.current = null
			}
			return
		}

		const step = (timestamp: number) => {
			if (!start.current) start.current = timestamp

			const progress = timestamp - start.current
			const progressRatio = Math.min(progress / duration, 1)
			const easedRatio = easingFn(progressRatio)

			const current = parseFloat((easedRatio * to).toFixed(decimals))
			setCount(current)

			if (progress < duration) {
				animationFrame = requestAnimationFrame(step)
			} else {
				setCount(parseFloat(to.toFixed(decimals)))
			}
		}

		animationFrame = requestAnimationFrame(step)
		return () => cancelAnimationFrame(animationFrame)
	}, [to, duration, decimals, easingFn, isInView])

	return (
		<div ref={ref} className="inline">
			{count}
		</div>
	)
}
