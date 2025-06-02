'use client'

import { useState, type ComponentProps } from 'react'
import { VscCheck, VscCopy } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

export default function ClickToCopy({
	value,
	className,
	children = <VscCopy />,
	childrenWhenCopied = <VscCheck />,
	childrenWhenHover = <VscCopy />,
	...props
}: {
	value?: string
	childrenWhenCopied?: React.ReactNode
	childrenWhenHover?: React.ReactNode
} & ComponentProps<'button'>) {
	const [hovered, setHovered] = useState(false)
	const [copied, setCopied] = useState(false)

	return (
		<button
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className={cn('cursor-copy', copied && 'pointer-events-none', className)}
			onClick={() => {
				if (typeof window === 'undefined' || !value) return

				navigator.clipboard.writeText(value)

				setCopied(true)
				setTimeout(() => setCopied(false), 1000)
			}}
			title="Click to copy"
			{...props}
		>
			{copied ? childrenWhenCopied : hovered ? childrenWhenHover : children}
		</button>
	)
}
