import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'

export default function CustomPortableText({
	value,
	className,
}: { value: any } & React.ComponentProps<'div'>) {
	return (
		<div className={cn('mx-auto w-full', className)}>
			<PortableText
				value={value}
				components={{
					marks: {
						color: ({ children, value }) => {
							const color = value?.color
							return color ? (
								<span style={{ color }}>{children}</span>
							) : (
								children
							)
						},
					},
					block: {
						h1: ({ children }) => <h1 className="h1">{children}</h1>,
						h2: ({ children }) => <h2 className="h2">{children}</h2>,
					},
				}}
			/>
		</div>
	)
}
