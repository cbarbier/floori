import moduleProps from '@/lib/moduleProps'
import { PortableText, stegaClean } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'
import Calendar from '../Calendar'
import CustomPortableText from './RichtextModule/CustomPortableText'

export default function FL_Hero({
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
		<section
			className={cn(
				'pt-[9.25rem] pb-[3.875rem] sm:pt-[10.1875rem] sm:pb-[4.125rem]',
			)}
			{...moduleProps(props)}
		>
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
					{cta && (
						<CTAList ctas={[cta]} className={cn('!mt-4 justify-center')} />
					)}
				</div>
			</div>
			<Calendar />
		</section>
	)
}
