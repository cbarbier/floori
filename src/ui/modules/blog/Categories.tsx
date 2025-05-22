import Category from './Category'

export default function Categories({
	categories,
	linked,
	hash,
	...props
}: {
	categories?: Sanity.BlogCategory[]
	linked?: boolean
	hash?: boolean
} & React.ComponentProps<'ul'>) {
	if (!categories?.length) return null

	return (
		<ul {...props}>
			{categories.map((category, key) => (
				<li key={key}>
					<Category hash={hash} value={category} linked={linked} />
				</li>
			))}
		</ul>
	)
}
