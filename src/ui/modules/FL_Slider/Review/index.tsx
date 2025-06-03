'use client'

import { cn } from '@/lib/utils'
import { Img } from '@/ui/Img'

export default function Review({
	text,
	sign,
	starred,
	className,
	image,
	transition,
}: Partial<{
	text: string
	sign: string
	starred: boolean
	className: string
	image: Sanity.Image
	transition: boolean
}>) {
	return (
		<div
			className={cn(
				'wrapper border-darkseashell bg-seashell font-inter relative grid h-full w-full place-content-center rounded-[1.25rem] border p-6 px-6 text-center text-[1rem]',
				className,
				{
					'transition-all duration-300': transition,
					'h-[90%] w-[90%]': !starred,
				},
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
			<div
				className={cn('grid', {
					'grid-cols-[2.5rem_auto]': image,
				})}
			>
				<Img
					className={cn(
						'aspect-square w-8 rounded-3xl transition-all duration-700',
						{
							'w-10': starred,
						},
					)}
					image={image}
					alt={'portrait'}
				/>
				<div className="sign font-bold">{sign}</div>
			</div>
		</div>
	)
}
