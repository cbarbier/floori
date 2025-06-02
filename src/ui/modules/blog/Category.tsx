import Link from 'next/link'
import { BLOG_DIR } from '@/lib/env'
import { cn } from '@/lib/utils'

export default function Category({
	value,
	colored,
	label,
	linked,
}: {
	value?: Sanity.BlogCategory
	label?: string
	colored?: string
	linked?: boolean
}) {
	const props = {
		style: {
			background: colored,
		},
		className: cn(
			'hover:*:underline',
			!colored && "before:text-current/50 before:content-['#']",
			!linked && 'pointer-events-none',
			colored &&
				'rounded-[6.25rem] px-[2rem] py-2 font-cdis text[0.875rem] text-seashell font-bold uppercase',
		),
		children: <span>{label || value?.title}</span>,
	}

	return linked ? (
		<Link
			href={{
				pathname: `/${BLOG_DIR}`,
				query: { category: value?.slug.current },
			}}
			{...props}
		/>
	) : (
		<div {...props} />
	)
}
