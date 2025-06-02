'use client'

import { PortableTextMarkComponentProps } from 'next-sanity'
import { useInView } from '@/lib/useInView'
import { cn } from '@/lib/utils'
import css from '@/ui/animations/FadeInSection/fadeinsection.module.css'

const AsterixFlower = ({ children }: PortableTextMarkComponentProps<any>) => {
	const { isInView, ref } = useInView(1)

	return (
		<span ref={ref} className="relative inline-block">
			{children}
			<svg
				width="50"
				height="47"
				viewBox="0 0 50 47"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				style={
					{
						'--x': '100px',
						'--y': '0px',
					} as React.CSSProperties
				}
				className={cn(
					'absolute -top-4 left-full',
					css.fadeinsection,
					isInView ? css.isvisible : null,
				)}
			>
				<g filter="url(#filter0_d_223_3153)">
					<path
						d="M22.9737 7.07842C17.6387 9.06283 19.7418 14.7597 21.4603 17.3601C15.527 12.087 13.8656 12.4844 11.9617 12.7794C10.0578 13.0743 7.41979 14.9052 6.84315 17.738C6.26651 20.5708 8.1416 22.7466 9.85834 23.8887C11.2317 24.8024 13.3713 24.6611 14.2694 24.4763C11.4488 26.4278 11.6195 29.7299 11.7994 30.3991C11.9793 31.0683 11.8859 34.6324 16.0329 35.482C19.3505 36.1617 21.3515 33.164 21.9373 31.5802C22.0348 32.6541 23.2385 35.799 26.5575 36.0574C30.8084 36.1379 32.7214 33.21 33.0724 31.2268C33.4234 29.2436 32.336 27.598 32.1946 27.5163C33.6527 27.3408 35.2317 27.3481 37.0999 25.6758C38.9681 24.0034 40.909 18.868 36.7899 15.8109C33.4947 13.3652 30.5021 15.4712 29.4178 16.8299C30.2155 14.464 29.6424 4.5979 22.9737 7.07842Z"
						fill="white"
					/>
					<path
						d="M23.2894 13.7975C23.332 14.6064 23.5022 18.7719 23.582 20.7535C22.2586 18.7509 19.0648 17.3739 16.8375 16.9277C14.6101 16.4815 12.9784 17.7341 12.6898 18.3608C12.4012 18.9875 12.1678 20.3623 14.2229 22.143C15.867 23.5675 19.6607 23.5483 21.352 23.3606C20.2458 23.9463 17.6577 25.4532 16.1551 26.7949C14.2769 28.472 14.7351 29.5642 14.8344 29.8473C14.9337 30.1305 15.5332 31.3036 17.6061 30.7185C19.2644 30.2504 21.3974 28.1259 22.2567 27.1222C21.7998 28.5575 22.9108 31.8339 24.1028 32.4413C25.2947 33.0486 27.8507 32.9289 28.921 30.8266C29.7772 29.1448 28.2381 26.3372 27.3616 25.1437C27.9423 25.2249 29.2539 25.3754 29.8545 25.3272C30.6053 25.267 34.4874 24.0966 34.6293 21.3872C34.7713 18.6777 32.4237 18.0494 30.4369 17.9673C28.8475 17.9016 27.1713 18.9629 26.5318 19.5017C26.5906 18.8816 26.7054 17.4514 26.6949 16.6911C26.6817 15.7408 26.0558 12.6669 24.7015 12.0796C23.3472 11.4924 23.2361 12.7865 23.2894 13.7975Z"
						fill="#F99F00"
					/>
				</g>
				<defs>
					<filter
						id="filter0_d_223_3153"
						x="0.736694"
						y="0.681641"
						width="48.4933"
						height="45.3774"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
					>
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="2" dy="2" />
						<feGaussianBlur stdDeviation="4" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
						/>
						<feBlend
							mode="plus-darker"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_223_3153"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_223_3153"
							result="shape"
						/>
					</filter>
				</defs>
			</svg>
		</span>
	)
}

export default AsterixFlower
