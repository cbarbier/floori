import moduleProps from '@/lib/moduleProps'
import { cn } from '@/lib/utils'
import CustomPortableText from './RichtextModule/CustomPortableText'
import Image from 'next/image'
import { ResponsiveImg } from '../Img'
import { FadeInSection } from '../animations/FadeInSection'
import Flower from '@/assets/flower'

export default function FL_Founder({
	bio,
	image,
	...props
}: Partial<{
	bio: any
	image: Sanity.Img
}> &
	Sanity.Module) {
	return (
		<section className={cn('')} {...moduleProps(props)}>
			<div className="section relative mx-auto flex w-full flex-wrap items-center justify-center gap-[3.5625rem]">
				<div
					className={cn(
						'relative',
						'overflow-hidden rounded-[1.25rem] sm:rounded-[3.125rem]',
						'aspect-ratio-[349/283] w-full',
						'sm:aspect-ratio-[591/692] relative sm:w-[calc(50%-3.5625rem/2)]',
					)}
				>
					<div className="absolute top-8 left-8 z-10 sm:top-[90px]">
						<FadeInSection x={'-20px'} delay={'0.7s'}>
							<Flower />
						</FadeInSection>
					</div>
					<div className="absolute top-[90px] right-4 z-10">
						<Image
							src="/svg/flower.svg"
							alt="little flower"
							width={40}
							height={40}
						/>
					</div>
					{image && (
						<ResponsiveImg
							img={image}
							className="size-full object-cover"
							width={590}
							height={691}
							draggable={false}
							alt="portait de la fondatrice"
						/>
					)}
				</div>
				<div className="w-full sm:w-[calc(50%-6.5625rem/2)]">
					<svg
						width="42"
						height="32"
						viewBox="0 0 42 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="mb-[1.5rem] sm:mb-[3.125rem]"
					>
						<path
							d="M17.92 22.528C17.92 25.0027 17.024 27.136 15.232 28.928C13.5253 30.6347 11.4347 31.488 8.96 31.488C6.48533 31.488 4.352 30.6347 2.56 28.928C0.853333 27.136 0 25.0027 0 22.528V9.984C0 7.08267 0.896 4.69334 2.688 2.816C4.56533 0.938667 6.95467 0 9.856 0H16.384V6.912H10.368C8.064 6.912 6.912 8.192 6.912 10.752V13.952C7.50933 13.696 8.23467 13.568 9.088 13.568C11.4773 13.568 13.5253 14.464 15.232 16.256C17.024 17.9627 17.92 20.0533 17.92 22.528ZM41.216 22.528C41.216 25.0027 40.32 27.136 38.528 28.928C36.8213 30.6347 34.7307 31.488 32.256 31.488C29.7813 31.488 27.648 30.6347 25.856 28.928C24.1493 27.136 23.296 25.0027 23.296 22.528V9.984C23.296 7.08267 24.192 4.69334 25.984 2.816C27.8613 0.938667 30.2507 0 33.152 0H39.68V6.912H33.664C31.36 6.912 30.208 8.192 30.208 10.752V13.952C30.8053 13.696 31.5307 13.568 32.384 13.568C34.7733 13.568 36.8213 14.464 38.528 16.256C40.32 17.9627 41.216 20.0533 41.216 22.528Z"
							fill="#F99F00"
						/>
					</svg>

					<div className={cn('relative')}>
						<CustomPortableText
							className="font-inter text-justify"
							value={bio}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
