'use client'

import { PortableTextMarkComponentProps } from 'next-sanity'

import './CustomPortableText.css'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/lib/useIsMobile'

const Rays = ({
	children,
	isInView,
}: PortableTextMarkComponentProps<any> & {
	isInView?: boolean
}) => {
	const isMobile = useIsMobile()
	return (
		<span className="relative inline-block max-sm:mr-4">
			{children}
			<svg
				width={isMobile ? '25' : '35'}
				height={isMobile ? '28' : '39'}
				viewBox="0 0 35 39"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={cn('absolute top-[40%] left-[105%] sm:top-[60%]')}
			>
				<mask id="draw-mask2">
					<rect x="0" y="0" width="0" height="50" fill="white" id="mask-ray" />
				</mask>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M23.2895 2.88474C26.6315 3.81412 30.1304 4.28296 33.5246 4.71246C34.2557 4.8025 34.9344 4.30004 34.9867 3.59213C35.0911 2.88371 34.5686 2.23583 33.8898 2.14579C30.6 1.73233 27.2061 1.28989 24.0208 0.395171C23.3419 0.201118 22.6105 0.600603 22.4017 1.28781C22.1928 1.9745 22.6106 2.69017 23.2895 2.88474Z"
					fill="#230903"
					mask="url(#draw-mask2)"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M13.1595 16.0612C18.538 21.5004 24.5954 26.2395 29.8695 31.8246C30.3394 32.3462 31.1749 32.3741 31.6971 31.8872C32.2193 31.3997 32.2713 30.5801 31.7491 30.0584C26.475 24.4573 20.4177 19.7027 15.0392 14.2475C14.517 13.7383 13.6817 13.7311 13.1595 14.232C12.6895 14.7324 12.6373 15.552 13.1595 16.0612Z"
					fill="#230903"
					mask="url(#draw-mask2)"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M3.08056 36.9823C2.9239 33.8691 2.76755 30.756 2.6109 27.6423C2.6109 26.9293 1.98397 26.3787 1.25291 26.4133C0.521846 26.4485 -3.40605e-05 27.0555 -3.41229e-05 27.7691C0.156621 30.8874 0.312971 34.0052 0.469627 37.123C0.521845 37.8361 1.14857 38.3831 1.87963 38.3442C2.55847 38.3054 3.13278 37.6948 3.08056 36.9823Z"
					fill="#230903"
					mask="url(#draw-mask2)"
				/>
			</svg>
		</span>
	)
}

export default Rays
