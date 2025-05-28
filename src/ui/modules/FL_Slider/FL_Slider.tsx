import moduleProps from '@/lib/moduleProps'
import { cn } from '@/lib/utils'
import CustomPortableText from '../RichtextModule/CustomPortableText'
import CloudArrow from '../FL_Cloud/CloudArrow'
import Cloud_shape from '../FL_Cloud/Cloud_shape'
import Slides from './Slides'

export default function FL_Slider({
	title,
	slides,
	...props
}: Partial<{
	title: any
	slides: Sanity.Slide[]
	cta: Sanity.CTA
}> &
	Sanity.Module) {
	console.log('slides', slides)
	return (
		<section className={cn('bg-creamy')} {...moduleProps(props)}>
			<div className="section mx-auto flex w-fit flex-col">
				<div
					className={cn('richtext m-automax-w-xl relative isolate text-center')}
				>
					<div className="mb-[1.25rem] sm:mb-[5.25rem]">
						<CustomPortableText value={title} />
					</div>
				</div>
				<Slides slides={slides} />
				<div
					className={cn('richtext m-automax-w-xl relative isolate text-center')}
				></div>
			</div>
		</section>
	)
}
