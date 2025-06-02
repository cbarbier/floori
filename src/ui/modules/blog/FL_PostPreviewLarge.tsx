'use client'

import Link from 'next/link'
import resolveUrl from '@/lib/resolveUrl'
import { Img } from '@/ui/Img'
import Date from '@/ui/Date'
import Categories from './Categories'
import Authors from './Authors'
import { cn } from '@/lib/utils'
import { useIsBreakpoint } from '@/lib/useBeforeBreakpoint'
import PostPreview from './PostPreview'
import css from './PostPreview.module.css'

export default function FL_PostPreviewLarge({
	post,
}: {
	post: Sanity.BlogPost
}) {
	const isBreakpoint = useIsBreakpoint(800)
	if (!post) return null

	if (isBreakpoint) {
		return <PostPreview post={post} />
	}

	return (
		<div className="group relative rounded-[2.5rem]">
			<div
				className={cn(
					'absolute top-0 left-0 h-full w-full rounded-[2.5rem] transition-all duration-500 group-hover:-rotate-2',
				)}
				style={{
					backgroundColor: post?.categories?.[0]?.color.hex,
				}}
			></div>
			<div
				className={cn(
					'bg-creamy border-darkseashell relative flex items-center gap-x-8 rounded-[2.5rem] border sm:aspect-[2.9]',
					css.animcard,
				)}
			>
				<figure
					className={cn(
						'bg-ink/5 relative rounded-l-[2.5rem]',
						'aspect-square self-start',
					)}
				>
					<Img
						className="aspect-square rounded-l-[2.5rem] object-cover transition-all group-hover:scale-100 group-hover:brightness-110"
						image={post.metadata.image}
						width={800}
						alt={post.metadata.title}
						loading="eager"
					/>
				</figure>

				<div className="self-start py-4 sm:max-w-[calc(100%-500px)]">
					<div className="mb-[3.125rem] flex flex-wrap gap-x-4">
						<Date value={post.publishDate} />
						<Categories
							className="absolute top-4 right-4 flex flex-wrap gap-x-2"
							categories={post.categories}
						/>
					</div>
					<div className="h2 mb-[2.25rem]">
						<Link className="" href={resolveUrl(post, { base: false })}>
							<span className="absolute inset-0" />
							{post.metadata.title}
						</Link>
					</div>

					<p className="">{post.metadata.description}</p>
				</div>
			</div>
		</div>
	)
}
