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
			<div className="section mx-auto flex w-fit flex-col text-balance">
				<div
					className={cn('richtext m-automax-w-xl relative isolate text-center')}
				>
					<div className="mb-[1.25rem] sm:mb-[1.5rem]">
						<CustomPortableText value={title} />
					</div>
					<div className="font-inter mb-[2.875rem] text-white sm:mb-[4.375rem]">
						<CustomPortableText value={subtitle} />
					</div>
					{cta && (
						<CTAList ctas={[cta]} className={cn('!mt-4 justify-center')} />
					)}
				</div>
			</div>
		</section>
	)
}
