'use client'

import { cn } from '@/lib/utils'

export default function Review({
	text,
	sign,
	starred,
}: Partial<{
	text: string
	sign: string
	starred: boolean
}>) {
	return (
		<div
			className={cn(
				'wrapper border-darkseashell bg-seashell font-inter grid h-[17.1875rem] w-[min(100vw-1rem,24.875rem)] place-content-center rounded-[1.25rem] border px-6 text-center text-[1rem] transition-all duration-500',
				{
					'h-[23.8125rem]': starred,
				},
			)}
		>
			<div className="text mb-[1.5rem]">{text}</div>
			<div className="sign font-bold">{sign}</div>
		</div>
	)
}
