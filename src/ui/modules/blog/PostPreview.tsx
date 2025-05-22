import { Img } from '@/ui/Img'
import Link from 'next/link'
import resolveUrl from '@/lib/resolveUrl'
import Authors from './Authors'
import Date from '@/ui/Date'
import Categories from './Categories'
import { cn } from '@/lib/utils'

export default function PostPreview({
	post,
	skeleton,
}: {
	post?: Sanity.BlogPost
	skeleton?: boolean
}) {
	if (!post && !skeleton) return null

	return (
		<div className="group bg-creamy relative isolate flex h-full flex-col space-y-2 rounded-[2.5rem]">
			<figure className="bg-ink/3 relative aspect-video overflow-hidden rounded-t-[2.5rem]">
				<Img
					className="aspect-video w-full rounded-t-[2.5rem] object-cover transition-all group-hover:scale-105 group-hover:brightness-110"
					image={post?.metadata.image}
					width={700}
					alt={post?.metadata.title}
				/>

				{post?.featured && (
					<span className="action absolute top-0 right-4 rounded-t-none py-1 text-xs shadow-md">
						Featured
					</span>
				)}
			</figure>
			<Categories
				className={cn(
					'absolute top-6 right-6 flex flex-wrap gap-x-2',
					'bg-deepocean rounded-[6.25rem] px-[2rem] py-2',
					'font-cdis text[0.875rem] text-seashell font-bold uppercase',
				)}
				categories={post?.categories}
				hash={false}
			/>

			<div className="p-[2rem]">
				<div className={cn('h4 font-cdis', skeleton && 'skeleton-2')}>
					<Link
						className="group-hover:underline"
						href={resolveUrl(post, { base: false })}
					>
						<span className="absolute inset-0" />
						{post?.metadata.title}
					</Link>
				</div>

				<div className="grow">
					<p className="font-inter line-clamp-3 text-sm empty:h-[3lh]">
						{post?.metadata.description}
					</p>
				</div>

				{(post?.authors?.length || skeleton) && (
					<Authors
						className="my-4 flex flex-wrap items-center gap-4 text-sm"
						authors={post?.authors}
						skeleton={skeleton}
					/>
				)}

				<hr />

				<div className="empty:skeleton flex flex-wrap gap-x-4 text-sm">
					<Date value={post?.publishDate} />
				</div>
			</div>
		</div>
	)
}
