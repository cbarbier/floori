import { cookies } from 'next/headers'
import { DEFAULT_LANG, langCookieName } from '@/lib/i18n'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import { IMAGE_QUERY } from '@/sanity/lib/queries'
import moduleProps from '@/lib/moduleProps'
import { PortableText, stegaClean } from 'next-sanity'
import FilterList from '@/ui/modules/blog/BlogList/FilterList'
import { Suspense } from 'react'
import PostPreview from '../blog/PostPreview'
import List from './List'
import { cn } from '@/lib/utils'
import FL_PostPreviewLarge from '../blog/FL_PostPreviewLarge'

export default async function FL_Blogs({
	pretitle,
	intro,
	layout,
	limit,
	showFeaturedPostsFirst,
	displayFilters,
	filteredCategory,
	lastarticle,
	...props
}: Partial<{
	pretitle: string
	intro: any
	layout: 'grid' | 'carousel'
	limit: number
	showFeaturedPostsFirst: boolean
	displayFilters: boolean
	filteredCategory: Sanity.BlogCategory
	lastarticle: string
}> &
	Sanity.Module) {
	const lang = (await cookies()).get(langCookieName)?.value ?? DEFAULT_LANG

	const posts = await fetchSanityLive<Sanity.BlogPost[]>({
		query: groq`
			*[
				_type == 'blog.post'
				${!!lang ? `&& (!defined(language) || language == '${lang}')` : ''}
				${!!filteredCategory ? `&& $filteredCategory in categories[]->._id` : ''}
			]|order(
				${showFeaturedPostsFirst ? 'featured desc, ' : ''}
				publishDate desc
			)
			${limit ? `[0...${limit}]` : ''}
			{
				...,
				categories[]->,
				authors[]->,
				metadata{
					...,
					image { ${IMAGE_QUERY} }
				}
			}
		`,
		params: {
			filteredCategory: filteredCategory?._id || '',
			limit: limit ?? 0,
		},
	})

	const listClassName = cn(
		'items-stretch gap-x-8 gap-y-12',
		stegaClean(layout) === 'grid'
			? 'grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'
			: 'carousel max-xl:full-bleed md:overflow-fade-r pb-4 [--size:320px] max-xl:px-4',
	)

	const featuredPost = posts.find((x) => x.featured) ?? posts?.[0]

	return (
		<section
			className="section space-y-8 pt-[9.25rem] pb-[3.875rem] sm:pt-[10.1875rem] sm:pb-[4.125rem]"
			{...moduleProps(props)}
		>
			{intro && (
				<header className="richtext text-center">
					<h1 className="h1 mb-[1.5rem] sm:mb-[2.9375rem]">{pretitle}</h1>
					<PortableText value={intro} />
				</header>
			)}

			{displayFilters && !filteredCategory && <FilterList />}

			{featuredPost && <FL_PostPreviewLarge post={featuredPost} />}

			<h2 className="h2">{lastarticle}</h2>
			<Suspense
				fallback={
					<ul className={listClassName}>
						{Array.from({ length: limit ?? 6 }).map((_, i) => (
							<li key={i}>
								<PostPreview skeleton />
							</li>
						))}
					</ul>
				}
			>
				<List
					posts={posts}
					// posts={Array(10)
					// 	.fill(0)
					// 	.map((p, i) => ({ ...posts[0], _id: posts[0]._id + i }))}
					className={listClassName}
				/>
			</Suspense>
		</section>
	)
}
