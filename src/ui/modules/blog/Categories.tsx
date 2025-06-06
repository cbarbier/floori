import Category from './Category'

export default function Categories({
	categories,
	linked,
	colored,
	...props
}: {
	categories?: Sanity.BlogCategory[]
	linked?: boolean
	colored?: boolean
} & React.ComponentProps<'ul'>) {
	if (!categories?.length) return null

	return (
		<ul {...props}>
			{categories.map((category, key) => (
				<li key={key}>
					<Category
						colored={category?.color.hex}
						value={category}
						linked={linked}
					/>
				</li>
			))}
		</ul>
	)
}
