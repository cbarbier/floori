import moduleProps from '@/lib/moduleProps'
import { cn } from '@/lib/utils'
import CustomPortableText from '../RichtextModule/CustomPortableText'
import CloudArrow from './CloudArrow'
import Cloud_shape from './Cloud_shape'

export default function FL_Cloud({
	title,
	subtitle,
	phrases,
	...props
}: Partial<{
	title: any
	subtitle: any
	phrases: String[]
	cta: Sanity.CTA
}> &
	Sanity.Module) {
	console.log('phrases', phrases)
	return (
		<section className={cn('')} {...moduleProps(props)}>
			<div className="section mx-auto flex w-fit flex-col px-0">
				<div
					className={cn('richtext m-automax-w-xl relative isolate text-center')}
				>
					<div className="mb-[1.25rem] sm:mb-[1.5rem]">
						<CustomPortableText value={title} />
					</div>
				</div>
				<Cloud_shape phrases={phrases} />
				<div className="relative h-[9.0625rem]">
					<div className="mx-auto w-fit">
						<CloudArrow />
					</div>
				</div>
				<div
					className={cn('richtext m-automax-w-xl relative isolate text-center')}
				>
					<div className="font-inter mb-[2.875rem] max-w-screen overflow-x-hidden text-[1.5rem] sm:mb-[4.375rem]">
						<CustomPortableText value={subtitle} />
					</div>
				</div>
			</div>
		</section>
	)
}
