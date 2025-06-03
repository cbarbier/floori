'use client'

import moduleProps from '@/lib/moduleProps'
import { cn } from '@/lib/utils'
import CustomPortableText from '../RichtextModule/CustomPortableText'
import CloudArrow from '../FL_Cloud/CloudArrow'
import Cloud_shape from '../FL_Cloud/Cloud_shape'
import Slides from '../FL_Slider/Slides'
import CTAList from '@/ui/CTAList'
import './def.css'
import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/lib/useInView'

export default function FL_Definition({
	definition,
	title,
	text,
	text2,
	cta,
	...props
}: Partial<{
	definition: string
	title: string
	text: string
	text2: string
	cta: Sanity.CTA
}> &
	Sanity.Module) {
	return (
		<section className={cn('bg-crab text-seashell')} {...moduleProps(props)}>
			<div className="section mx-auto flex w-fit flex-col px-0">
				<div className={cn('relative mb-[1.9375rem] text-center')}>
					<CustomPortableText
						className="font-cdis max-w-screen-lg text-[1.375rem] font-bold sm:text-[1.75rem]"
						value={title}
					/>
				</div>

				<div className="font-inter mx-auto mb-3 w-[min(calc(100vw-2rem),37.125rem)] text-center text-[1rem] leading-[1rem] sm:leading-[1.6875rem]">
					<p className={cn('mb-[1.5rem]')}>{text}</p>
					<p className={cn()}>{text2}</p>
				</div>
				{cta && (
					<CTAList
						ctas={[cta]}
						className={cn('mx-auto w-fit justify-center pt-8')}
					/>
				)}
			</div>
		</section>
	)
}
