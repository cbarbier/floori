'use client'

import React from 'react'
import { useInView } from '@/lib/useInView'
import css from './fadeinsection.module.css'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/lib/useIsMobile'

interface Props {
	children: React.ReactNode
	delay?: string
	y?: string
	ym?: string
	x?: string
	className?: string
}

export const FadeInSection: React.FC<Props> = ({
	children,
	className,
	delay,
	y,
	ym,
	x,
}) => {
	const isMobile = useIsMobile()
	const { ref, isInView } = useInView()

	const _y = isMobile ? ym : y
	return (
		<div
			ref={ref}
			className={cn(
				css.fadeinsection,
				isInView ? css.isvisible : null,
				className,
			)}
			style={
				{
					'--y': _y ?? '0px',
					'--x': x ?? '0px',
					'--delay': delay ?? '0s',
				} as React.CSSProperties
			}
		>
			{children}
		</div>
	)
}
