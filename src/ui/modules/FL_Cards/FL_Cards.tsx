import moduleProps from '@/lib/moduleProps'
import { PortableText, stegaClean } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'
import Calendar from '@/ui/Calendar'
import CustomPortableText from '../RichtextModule/CustomPortableText'
import css from './FL_Cards.module.css'

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
	console.log('cards', cards)
	return (
		<section className={cn('')} {...moduleProps(props)}>
			<div className="section mx-auto flex w-fit flex-col text-balance">
				<div
					className={cn('richtext m-automax-w-xl relative isolate text-center')}
				>
					<div className="mb-[1.25rem] sm:mb-[1.5rem]">
						<CustomPortableText value={title} />
					</div>
					<div className="font-inter mb-[2.875rem] sm:mb-[4.375rem]">
						<CustomPortableText value={subtitle} />
					</div>
				</div>
				<div className="cards mx-auto mb-[2.375rem] flex w-fit flex-wrap justify-center gap-[1.25rem] sm:mb-[3.6875rem] sm:gap-[1.375]">
					{cards?.map((c, i) => {
						// <Card key={'fl-card-' + i} data={c} />
						const cardClass =
							'font-cdis px-8 text-[1.375rem] font-semibold sm:text-[1.75rem]'
						return (
							<div key={'fl-card-' + i}>
								<div className="perspective group aspect-square w-[min(calc(100vw-2rem),21.9375rem)] text-center sm:w-[25rem]">
									{/* The inner card flips when the parent group is hovered */}
									<div
										className={cn(
											'transform-style preserve-3d relative h-full w-full delay-0 group-hover:rotate-y-180',
											css.flipcard,
										)}
									>
										<div className="bg-creamy absolute flex h-full w-full items-center justify-center rounded-[2.5rem] border border-[#D1BCB2] text-black backface-hidden">
											<div className={cn(cardClass)}>{c.front}</div>
										</div>
										<div
											className="absolute flex h-full w-full rotate-y-180 transform flex-col items-center justify-center rounded-[2.5rem] border border-[#D1BCB2] text-white backface-hidden"
											style={{
												backgroundColor: c.color.hex,
											}}
										>
											<div className={cn(cardClass)}>{c.front}</div>
											<CustomPortableText value={c.back} />
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				{cta && <CTAList ctas={[cta]} className={cn('!mt-4 justify-center')} />}
			</div>
		</section>
	)
}
