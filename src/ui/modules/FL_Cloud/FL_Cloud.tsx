import moduleProps from '@/lib/moduleProps'
import { cn } from '@/lib/utils'
import CustomPortableText from '../RichtextModule/CustomPortableText'
import CloudArrow from './CloudArrow'
import Cloud_v2 from './Cloud_v2'
import { FadeInSection } from '@/ui/animations/FadeInSection'

export default function FL_Cloud({
	title,
	subtitle,
	text,
	phrases,
	...props
}: Partial<{
	title: any
	text: any
	subtitle: any
	phrases: String[]
	cta: Sanity.CTA
}> &
	Sanity.Module) {
	console.log('phrases', phrases)
	return (
		<section className={cn('bg-creamy')} {...moduleProps(props)}>
			<div className="section header-w mx-auto flex flex-col">
				<div className={cn('richtext relative isolate text-center')}>
					<div className="mb-[1.25rem] sm:mb-[1.5rem]">
						<CustomPortableText value={title} />
					</div>
					{text && (
						<div className="font-inter mb-[1.25rem] sm:mb-[1.5rem]">
							<CustomPortableText value={text} />
						</div>
					)}
				</div>
				<Cloud_v2 phrases={phrases} />

				<div className="relative mt-6 h-[9.0625rem]">
					<div className="mx-auto w-fit">
						<CloudArrow />
					</div>
				</div>
				<div
					className={cn('richtext m-automax-w-xl relative isolate text-center')}
				>
					<FadeInSection delay="4s">
						<div className="font-cdis text-butterschotch mb-[2.875rem] max-w-screen overflow-x-hidden text-[1.5rem] sm:mb-[4.375rem]">
							<CustomPortableText value={subtitle} />
						</div>
					</FadeInSection>
				</div>
			</div>
		</section>
	)
}
