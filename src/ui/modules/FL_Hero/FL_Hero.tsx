'use client'

import moduleProps from '@/lib/moduleProps'
import CTAList from '@/ui/CTAList'
import { cn } from '@/lib/utils'
import Calendar from '../../Calendar'
import CustomPortableText from '../RichtextModule/CustomPortableText'

export default function FL_Hero({
	title,
	subtitle,
	cta,
	calendar,
	...props
}: Partial<{
	title: any
	subtitle: any
	cta: Sanity.CTA
	calendar: boolean
}> &
	Sanity.Module) {
	return (
		<section
			className={cn(
				'pt-[9.25rem] pb-[3.875rem] sm:pt-[10.1875rem] sm:pb-[4.125rem]',
			)}
			{...moduleProps(props)}
		>
			<div className="section richtext flex w-fit flex-col text-balance">
				<div className={cn('relative text-center')}>
					<div id="herotitle" className="mx-auto mb-[3rem]">
						<CustomPortableText value={title} />
					</div>
					{subtitle && (
						<div className="font-inter">
							<CustomPortableText value={subtitle} />
						</div>
					)}
					{cta && (
						<CTAList
							ctas={[cta]}
							className={cn('mx-auto w-fit justify-center pt-8')}
						/>
					)}
				</div>
			</div>
			{calendar && <Calendar />}
		</section>
	)
}
