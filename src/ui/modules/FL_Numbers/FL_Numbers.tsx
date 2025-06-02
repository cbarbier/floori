import moduleProps from '@/lib/moduleProps'
import { cn } from '@/lib/utils'
import CustomPortableText from '../RichtextModule/CustomPortableText'
import { CountUp } from '@/ui/animations/CountUp'
import { FadeInSection } from '@/ui/animations/FadeInSection'

export default function FL_Numbers({
	title,
	numbers,
	...props
}: Partial<{
	title: any
	numbers: Sanity.Number[]
}> &
	Sanity.Module) {
	console.log('numbers', numbers)
	return (
		<FadeInSection>
			<section className={cn('bg-vistablue')} {...moduleProps(props)}>
				<div className="section mx-auto flex w-fit flex-col">
					<div
						className={cn(
							'richtext m-automax-w-xl relative isolate text-center',
						)}
					>
						<div className="mb-[4.6875rem] sm:mb-[4rem]">
							<div className="font-cdis mb-[1.625rem] font-bold sm:mb-[2.125rem]">
								<CustomPortableText value={title} />
							</div>
						</div>
					</div>

					<div className="cards mx-auto flex w-fit flex-wrap justify-center gap-[1.25rem] sm:gap-[1.375]">
						{numbers?.map((number, i) => {
							const cardClass =
								'max-w-[18.6875rem] flex flex-wrap justify-center p-2 items-center gap-[1rem] sm:gap-[1.875rem] group'
							return (
								<div key={'fl-number-' + i}>
									<div className={cn(cardClass)}>
										<div className="transition-all duration-700 group-hover:scale-105">
											<p className="number font-cdis text-deepocean text-[4.375rem] font-bold">
												<CountUp duration={1700} to={number.value} />
												<span className="unit">{number.unit}</span>
											</p>
										</div>
										<CustomPortableText
											value={number.text}
											className="font-inter text-center text-[0.875rem] leading-[1.6875rem] text-white sm:text-[1rem]"
										/>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</section>
		</FadeInSection>
	)
}
