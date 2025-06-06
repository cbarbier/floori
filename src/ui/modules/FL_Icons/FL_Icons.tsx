import moduleProps from '@/lib/moduleProps'
import { PortableText, stegaClean } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'
import Calendar from '@/ui/Calendar'
import CustomPortableText from '../RichtextModule/CustomPortableText'
import { Img } from '@/ui/Img'
import { FadeInSection } from '@/ui/animations/FadeInSection'

export default function FL_Icons({
	icons,
	...props
}: Partial<{
	icons: Sanity.FLIcons[]
}> &
	Sanity.Module) {
	console.log('icons', icons)
	return (
		<section className={cn('bg-creamy')} {...moduleProps(props)}>
			<div className="section mx-auto flex w-fit flex-col">
				<div className="cards mx-auto flex w-fit flex-wrap justify-center gap-[3.5rem] sm:gap-[1.375]">
					{icons?.map((icon, i) => {
						// <Card key={'fl-card-' + i} data={c} />
						const cardClass =
							'font-inter max-w-[18.6875rem] flex flex-wrap justify-center p-2 items-center gap-[3.5625rem] group'
						return (
							<FadeInSection key={'fl-icon-' + i} delay={`${0.5 * (i + 1)}s`}>
								<div>
									<div className={cn(cardClass)}>
										<Img
											height={80}
											image={icon.image}
											className="ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] transition-transform duration-500 group-hover:-translate-y-5 group-hover:scale-105 focus:scale-100"
										/>
										<CustomPortableText
											value={icon.text}
											className="text-center text-[1rem]"
										/>
									</div>
								</div>
							</FadeInSection>
						)
					})}
				</div>
			</div>
		</section>
	)
}
