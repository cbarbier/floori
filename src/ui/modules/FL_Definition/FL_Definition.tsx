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
	const ref = useRef<HTMLSpanElement>(null)
	const { isInView, ref: viewRef } = useInView(0.5)
	const [width, setWidth] = useState(ref?.current?.style?.width ?? 200)
	const words = definition?.split(' ')
	const lastWord = words?.pop()

	useEffect(() => {
		if (!ref.current) return

		setWidth(ref.current.style.width)
	}, [])

	return (
		<section
			ref={viewRef}
			className={cn('bg-crab text-seashell')}
			{...moduleProps(props)}
		>
			<div className="section mx-auto flex w-fit flex-col px-0 pb-[3.4375rem] sm:pb-[6.875rem]">
				<div className={cn('relative mb-[1.9375rem] text-center sm:mb-[3rem]')}>
					<div
						id="deftitle"
						className="font-cdis max-w-screen-lg text-[1.375rem] font-bold sm:text-[1.75rem]"
					>
						{words?.join(' ')}
						<span ref={ref} className="inilne-block">
							<span> {lastWord}</span>
							<svg
								className=""
								width={width}
								height="12"
								viewBox={`0 0 373 12`}
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								{isInView && (
									<mask
										id="draw-mask5"
										className={cn(isInView && 'anim-mask5')}
									>
										<rect
											x="0"
											y="0"
											width="0"
											height="50"
											fill="white"
											id="mask-rect5"
										/>
									</mask>
								)}
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M158.655 2.00227C141.105 2.31461 123.761 2.69867 106.848 3.11855C82.9055 3.71251 58.9723 4.32697 35.1834 5.29985C27.6952 5.60707 20.0908 5.80164 12.6494 6.18567C7.97813 6.42633 1.78416 6.76935 0.971284 6.84103C0.546114 6.88199 0.360627 6.9435 0.300691 6.96398C-0.120732 7.10735 -0.0438382 7.24554 0.194032 7.35307C0.289555 7.39916 0.531104 7.51185 1.20164 7.52721C46.0449 8.5769 91.8996 6.52873 136.797 6.31368C214.658 5.94501 294.878 7.40945 372.12 10.6046C372.794 10.6302 373.45 10.5021 373.544 10.3127C373.656 10.1283 373.169 9.94913 372.495 9.92353C295.121 6.72327 214.77 5.25371 136.76 5.6275C94.9169 5.82719 52.2482 7.62449 10.3475 7.01004C11.3102 6.95884 12.2542 6.90762 13.1158 6.86153C20.5272 6.4775 28.0998 6.28806 35.558 5.98084C59.2964 5.00796 83.1808 4.39351 107.091 3.80466C136.76 3.06732 167.72 2.43239 198.924 2.1354C210.087 2.18149 221.213 2.22759 232.339 2.28392C256.407 2.40681 280.587 2.76524 304.599 3.24656C311.829 3.39505 319.058 3.54865 326.288 3.68178C328.685 3.72786 334.866 3.86097 335.728 3.85073C336.796 3.84049 337.002 3.59473 337.02 3.55377C337.076 3.4616 337.039 3.33358 336.515 3.22605C336.458 3.21069 336.121 3.15946 335.372 3.12873C291.713 1.31611 245.094 1.01405 198.962 1.44929C150.301 1.25983 101.454 1.17787 52.9169 1.09082C52.2221 1.09082 51.6545 1.24446 51.6489 1.43391C51.6452 1.62337 52.2051 1.77701 52.9 1.78213C88.0449 1.84357 123.368 1.90498 158.655 2.00227Z"
									stroke="black"
									strokeOpacity="0.5"
									strokeWidth="1.3"
									mask="url(#draw-mask5)"
								/>
							</svg>
						</span>
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
