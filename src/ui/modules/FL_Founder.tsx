import moduleProps from '@/lib/moduleProps'
import { cn } from '@/lib/utils'
import CustomPortableText from './RichtextModule/CustomPortableText'
import Image from 'next/image'
import { ResponsiveImg } from '../Img'

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
			<div className="section mx-auto flex w-full flex-wrap items-center justify-center gap-[3.5625rem]">
				<div
					className={cn(
						'overflow-hidden rounded-[1.25rem] sm:rounded-[3.125rem]',
						'aspect-ratio-[349/283] w-[calc(100%-2rem)]',
						'sm:aspect-ratio-[591/692] sm:w-[calc(50%-3.5625rem/2)]',
					)}
				>
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
				<div
					className={cn(
						'richtext m-automax-w-xl relative isolate w-[calc(100%-2rem)] text-left sm:w-[calc(50%-6.5625rem/2)]',
					)}
				>
					<CustomPortableText value={bio} />
				</div>
			</div>
		</section>
	)
}
