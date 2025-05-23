import moduleProps from '@/lib/moduleProps'
import { PortableText, stegaClean } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'
import Calendar from '../Calendar'
import CustomPortableText from './RichtextModule/CustomPortableText'

export default function FL_Final({
	title,
	subtitle,
	cta,
	...props
}: Partial<{
	title: any
	subtitle: any
	cta: Sanity.CTA
}> &
	Sanity.Module) {
	return (
		<section className={cn('bg-crab')} {...moduleProps(props)}>
			<div className="section flex flex-col text-balance">
				<div
					className={cn('richtext m-automax-w-xl relative isolate text-center')}
				>
					<div className="mb-[1.25rem] sm:mb-[1.5rem]">
						<CustomPortableText value={title} />
					</div>
					<div className="font-inter text-white">
						<CustomPortableText value={subtitle} />
					</div>
					{cta && (
						<CTAList
							ctas={[cta]}
							className={cn('mx-auto w-fit justify-center pt-8')}
						/>
					)}
				</div>
			</div>
		</section>
	)
}
