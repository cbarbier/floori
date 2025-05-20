'use client'

import React from 'react'
import { useInView } from '@/lib/useInView'
import css from './fadeinsection.module.css'
import { cn } from '@/lib/utils'

interface Props {
	children: React.ReactNode
}

export const FadeInSection: React.FC<Props> = ({ children }) => {
	const { ref, isInView } = useInView()

	return (
		<div
			ref={ref}
			className={cn(css.fadeinsection, isInView ? css.isvisible : null)}
		>
			{children}
		</div>
	)
}
