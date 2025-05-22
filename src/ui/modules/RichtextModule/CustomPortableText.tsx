import { cn } from '@/lib/utils'
import { PortableText } from 'next-sanity'

export default function CustomPortableText({
	value,
	className,
}: { value: any } & React.ComponentProps<'div'>) {
	return (
		<div className={cn('mx-auto', className)}>
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
						strong: ({ children }) => (
							<span className="font-bold">{children}</span>
						),
						source: ({ children }) => (
							<span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
								{children}
							</span>
						),
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
