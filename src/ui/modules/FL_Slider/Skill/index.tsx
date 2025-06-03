'use client'

import { cn } from '@/lib/utils'

export default function Skill({
	text,
	title,
	starred,
	className,
	transition,
}: Partial<{
	title: string
	text: string
	starred: boolean
	className: string
	transition: boolean
}>) {
	return (
		<div
			className={cn(
				'wrapper border-darkseashell bg-seashell grid h-full w-full place-content-center rounded-[1.25rem] border px-6 text-center',
				className,
				{
					'transition-all duration-300': transition,
					'h-[90%] w-[90%]': !starred,
				},
			)}
		>
			<div className="title font-inter mb-[1rem] text-[1rem] font-bold">
				{title}
			</div>
			<div className="text font-inter">{text}</div>
		</div>
	)
}
