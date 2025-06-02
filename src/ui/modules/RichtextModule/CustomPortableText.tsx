'use client'

import { cn } from '@/lib/utils'
import { PortableText } from 'next-sanity'
import CardUnderline from './CardUnderline'
import HeroUnderline from './HeroUnderline'
import AsterixFlower from './AsterixFlower'
import { useInView } from '@/lib/useInView'
import Rays from './Rays'
import DoubleFlower from './DoubleFlower'

export default function CustomPortableText({
	value,
	className,
}: { value: any } & React.ComponentProps<'div'>) {
	const { ref, isInView } = useInView(1)
	return (
		<div className={cn('mx-auto', className)}>
			<div ref={ref} className="muck h-2"></div>
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
						doubleflower: DoubleFlower,
						asterixflower: AsterixFlower,
						herounderline: HeroUnderline,
						cardunderline: ({ children, ...props }) => (
							<CardUnderline {...props} isInView={isInView}>
								{children}
							</CardUnderline>
						),
						rays: Rays,
					},
					list: {
						bullet: ({ children }) => (
							<ul className="list-disc pl-6">{children}</ul>
						),
						number: ({ children }) => (
							<ol className="list-decimal pl-6">{children}</ol>
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
