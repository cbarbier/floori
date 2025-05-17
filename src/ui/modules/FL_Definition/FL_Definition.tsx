import moduleProps from '@/lib/moduleProps'
import { cn } from '@/lib/utils'
import CustomPortableText from '../RichtextModule/CustomPortableText'
import CloudArrow from '../FL_Cloud/CloudArrow'
import Cloud_shape from '../FL_Cloud/Cloud_shape'
import Slides from '../FL_Slider/Slides'
import CTAList from '@/ui/CTAList'

export default function FL_Definition({
	definition,
	text,
	text2,
	cta,
	...props
}: Partial<{
	definition: string
	text: string
	text2: string
	cta: Sanity.CTA
}> &
	Sanity.Module) {
	return (
		<section className={cn('bg-crab text-seashell')} {...moduleProps(props)}>
			<div className="section mx-auto flex w-fit flex-col px-0 pb-[3.4375rem] sm:pb-[6.875rem]">
				<div className={cn('text-center')}>
					<div className="font-cdis mb-[1.9375rem] text-[1.375rem] font-bold sm:mb-[3rem] sm:text-[1.75rem]">
						{definition}
					</div>
				</div>

				<div className="font-inter mx-auto mb-3 w-[min(100vw,37.125rem)] text-center text-[1rem] leading-[1rem] sm:leading-[1.6875rem]">
					<p className={cn('mb-[3rem]')}>{text}</p>
					<p className={cn()}>{text2}</p>
				</div>
				{cta && <CTAList ctas={[cta]} className={cn('justify-center')} />}
			</div>
		</section>
	)
}
