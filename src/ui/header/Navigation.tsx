import { getSite } from '@/sanity/lib/queries'
import CTA from '@/ui/CTA'
import LinkList from './LinkList'
import { cn } from '@/lib/utils'

export default async function Menu() {
	const { headerMenu } = await getSite()

	const parentClassName = cn('sm:px-3 sm:text-center sm:leading-tight')

	return (
		<nav
			className="max-sm:anim-fade-to-r max-sm:header-closed:hidden flex gap-y-2 [grid-area:nav] max-sm:my-4 max-sm:flex-col sm:justify-start"
			role="navigation"
		>
			{headerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case 'link':
						return (
							<CTA
								className={cn(
									parentClassName,
									'link sm:grid sm:place-content-center',
								)}
								link={item}
								key={key}
							/>
						)

					case 'link.list':
						return (
							<LinkList
								summaryClassName={parentClassName}
								{...item}
								key={key}
							/>
						)

					default:
						return null
				}
			})}
		</nav>
	)
}
