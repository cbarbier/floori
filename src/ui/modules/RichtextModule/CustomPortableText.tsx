'use client'

import { cn } from '@/lib/utils'
import CardUnderline from './CardUnderline'
import HeroUnderline from './HeroUnderline'
import AsterixFlower from './AsterixFlower'
import { useInView } from '@/lib/useInView'
import Rays from './Rays'
import DoubleFlower from './DoubleFlower'
import DefUnderline from './DefUnderline'
import { PortableText } from 'next-sanity'

export default function CustomPortableText({
	value,
	className,
}: { value: any } & React.ComponentProps<'div'>) {
	const { ref, isInView } = useInView(1)
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
						source: ({ children }) => (
							<span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
								{children}
							</span>
						),
						strong: ({ children }) => (
							<span className="font-bold">{children}</span>
						),
						doubleflower: DoubleFlower,
						asterixflower: AsterixFlower,
						herounderline: HeroUnderline,
						defunderline: DefUnderline,
						cardunderline: ({ children, ...props }) => (
							<CardUnderline {...props} isInView={isInView}>
								{children}
							</CardUnderline>
						),
						rays: Rays,
					},
					list: {
						bullet: ({ children }) => (
							<ul className="list-disc pl-[13px]">{children}</ul>
						),
						number: ({ children }) => (
							<ol className="list-decimal pl-6">{children}</ol>
						),
					},
					listItem: ({ children }) => <li className="">{children}</li>,
					block: {
						h1: ({ children }) => <h1 className="h1">{children}</h1>,
						h2: ({ children }) => <h2 className="h2">{children}</h2>,
					},
				}}
			/>
		</div>
	)
}
