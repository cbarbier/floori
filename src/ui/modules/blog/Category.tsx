import Link from 'next/link'
import { BLOG_DIR } from '@/lib/env'
import { cn } from '@/lib/utils'

export default function Category({
	value,
	label,
	linked,
	hash = true,
}: {
	value?: Sanity.BlogCategory
	label?: string
	hash?: boolean
	linked?: boolean
}) {
	const props = {
		className: cn(
			'hover:*:underline',
			hash && "before:text-current/50 before:content-['#']",
			!linked && 'pointer-events-none',
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
