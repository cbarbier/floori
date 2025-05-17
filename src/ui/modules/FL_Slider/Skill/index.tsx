'use client'

import { cn } from '@/lib/utils'

export default function Skill({
	text,
	title,
	starred,
}: Partial<{
	title: string
	text: string
	starred: boolean
}>) {
	return (
		<div
			className={cn(
				'wrapper border-darkseashell bg-seashell grid h-[17.1875rem] w-[min(100vw-1rem,24.875rem)] place-content-center rounded-[1.25rem] border px-6 text-center transition-all duration-500',
				{
					'h-[23.8125rem]': starred,
				},
			)}
		>
			<div className="title font-cdis mb-[1rem] text-[1rem] font-bold">
				{title}
			</div>
			<div className="text">{text}</div>
		</div>
	)
}
