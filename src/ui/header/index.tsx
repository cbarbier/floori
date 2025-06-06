import { getSite } from '@/sanity/lib/queries'
import Wrapper from './Wrapper'
import Link from 'next/link'
import { Img } from '@/ui/Img'
import Navigation from './Navigation'
import CTAList from '@/ui/CTAList'
import Toggle from './Toggle'
import { cn } from '@/lib/utils'
import css from './Header.module.css'
import FL_LanguageSwitcher from '../LanguageSwitcher/FL_LanguageSwitcher'
import { FadeInSection } from '../animations/FadeInSection'
import HeaderLogo from './HeaderLogo'

export default async function Header() {
	const { title, logo, ctas } = await getSite()

	const logoImage = logo?.image?.dark || logo?.image?.default

	return (
		<>
			<Wrapper
				className={cn(
					'max-sm:header-open:shadow-lg absolute top-[1.25rem] left-1/2 z-10 w-[min(calc(100vw-2rem),58rem)] -translate-x-1/2 rounded-[1.5rem] bg-white p-3 sm:top-[2rem] sm:h-[77px]',
					'anim-header',
				)}
			>
				<div
					className={cn(
						css.header,
						'mx-auto grid max-w-screen-xl items-center gap-x-6',
					)}
				>
					<FL_LanguageSwitcher className="[grid-area:lang]" />
					<div className="[grid-area:logo]">
						<Link className={cn('h4 sm:h3 grid')} href="/">
							{logoImage ? (
								// <Img
								// 	className="mx-auto inline-block max-h-[53px] w-fit"
								// 	image={logoImage}
								// 	alt={logo?.name || title}
								// />
								<div className="mx-auto inline-block aspect-[641/347] max-h-[53px] w-fit">
									<HeaderLogo />
								</div>
							) : (
								<span className="text-gradient">{title}</span>
							)}
						</Link>
					</div>

					<Navigation />

					<CTAList
						ctas={ctas}
						className="max-sm:header-closed:hidden [grid-area:ctas] max-sm:*:w-full sm:ms-auto"
					/>

					<Toggle />
				</div>
			</Wrapper>
		</>
	)
}
