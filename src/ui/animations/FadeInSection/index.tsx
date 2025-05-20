'use client'

import React from 'react'
import { useInView } from '@/lib/useInView'
import css from './fadeinsection.module.css'
import { cn } from '@/lib/utils'

interface Props {
	children: React.ReactNode
	delay?: string
	y?: string
	x?: string
}

export const FadeInSection: React.FC<Props> = ({ children, delay, y, x }) => {
	const { ref, isInView } = useInView()

	return (
		<div
			ref={ref}
			className={cn(css.fadeinsection, isInView ? css.isvisible : null)}
			style={
				{
					'--y': y ?? '0px',
					'--x': x ?? '0px',
					'--delay': delay ?? '0s',
				} as React.CSSProperties
			}
		>
			{children}
		</div>
	)
}
