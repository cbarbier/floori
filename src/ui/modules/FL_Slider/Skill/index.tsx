'use client'

import { cn } from '@/lib/utils'

export default function Skill({
	text,
	title,
	starred,
	className,
}: Partial<{
	title: string
	text: string
	starred: boolean
	className: string
}>) {
	return (
		<div
			className={cn(
				'wrapper border-darkseashell bg-seashell grid h-[17.1875rem] min-w-[min(100%-1rem,24.875rem)] place-content-center rounded-[1.25rem] border px-6 text-center transition-all duration-300',
				{
					'h-[23.8125rem]': starred,
				},
				className,
			)}
		>
			<div className="title font-sora mb-[1rem] text-[1rem] font-bold">
				{title}
			</div>
			<div className="text">{text}</div>
		</div>
	)
}
