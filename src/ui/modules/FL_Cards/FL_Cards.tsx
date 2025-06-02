'use client'

import moduleProps from '@/lib/moduleProps'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'
import CustomPortableText from '../RichtextModule/CustomPortableText'
import css from './FL_Cards.module.css'
import { useEffect, useState } from 'react'
import { useIsMobile } from '@/lib/useIsMobile'
import './cards.css'
import { FadeInSection } from '@/ui/animations/FadeInSection'
import { useInView } from '@/lib/useInView'

export default function FL_Cards({
	title,
	subtitle,
	cta,
	cards,
	...props
}: Partial<{
	title: any
	subtitle: any
	cards: Sanity.Card[]
	cta: Sanity.CTA
}> &
	Sanity.Module) {
	const isMobile = useIsMobile()
	const { ref: refFirstCard, isInView } = useInView()

	return (
		<section className={cn('cardsection')} {...moduleProps(props)}>
			<div className="section mx-auto flex w-fit flex-col text-balance">
				<div className={cn('richtext isolate text-center')}>
					<div id="cardtitle" className="relative mb-[1.25rem] sm:mb-[1.5rem]">
						<CustomPortableText value={title} />
					</div>
					<div
						id="cardsubtitle"
						className="font-inter mb-[2.875rem] sm:mb-[4.375rem]"
					>
						<CustomPortableText value={subtitle} />
					</div>
				</div>
				<div className="cards mx-auto mb-[2.375rem] flex w-fit flex-wrap justify-center gap-[1.25rem] sm:mb-[3.6875rem] sm:gap-[1.375rem]">
					{cards?.map((c, i) => {
						// <Card key={'fl-card-' + i} data={c} />
						const cardClass =
							'font-cdis px-8 text-[1.375rem] font-semibold sm:text-[1.75rem]'
						return (
							<div key={'fl-card-' + i}>
								<div className="perspective group aspect-square w-[min(calc(100vw-2rem),21.9375rem)] text-center sm:w-[25rem]">
									{/* The inner card flips when the parent group is hovered */}
									<div
										ref={i === 0 ? refFirstCard : null}
										className={cn(
											'transform-style preserve-3d relative h-full w-full delay-0 group-hover:rotate-y-180',
											{ 'rotate-y-180': i === 0 && !isInView },
											css.flipcard,
										)}
									>
										<div className="bg-creamy absolute flex h-full w-full items-center justify-center rounded-[2.5rem] border border-[#D1BCB2] text-black backface-hidden">
											<div className={cn(cardClass)}>{c.front}</div>
										</div>
										<div
											className="absolute flex h-full w-full rotate-y-180 transform flex-col items-center justify-center rounded-[2.5rem] border border-[#D1BCB2] p-6 text-white backface-hidden"
											style={{
												backgroundColor: c.color.hex,
											}}
										>
											<div className={cn(cardClass)}>{c.front}</div>
											<CustomPortableText
												className={cn(css.back, 'font-inter')}
												value={c.back}
											/>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				{cta && (
					<CTAList
						ctas={[cta]}
						className={cn('mx-auto w-fit justify-center py-8')}
					/>
				)}
			</div>
		</section>
	)
}
