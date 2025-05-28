'use client'

import { cn } from '@/lib/utils'

export default function Review({
	text,
	sign,
	starred,
	className,
}: Partial<{
	text: string
	sign: string
	starred: boolean
	className: string
}>) {
	return (
		<div
			className={cn(
				'wrapper border-darkseashell bg-seashell font-inter grid h-[17.1875rem] min-w-[min(100%-1rem,24.875rem)] place-content-center rounded-[1.25rem] border p-6 px-6 text-center text-[1rem] transition-all duration-500',
				{
					'h-[23.8125rem]': starred,
				},
				className,
			)}
		>
			<div
				className={cn(
					'text mb-[1.5rem]',
					'overflow-y-scroll',
					'scrollbar-custom',
				)}
			>
				{text}
			</div>
			<div className="sign font-bold">{sign}</div>
		</div>
	)
}
