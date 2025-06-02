import { getSite } from '@/sanity/lib/queries'
import Navigation from './Navigation'
import Social from '@/ui/Social'
import { PortableText } from 'next-sanity'
import Link from 'next/link'
import FooterLogo from './FooterLogo'
import ClickToCopy from '../ClickToCopy'
import { VscCheck, VscCopy, VscMail } from 'react-icons/vsc'

export default async function Footer() {
	const { title, blurb, logo, copyright, email } = await getSite()

	const logoImage = logo?.image?.light || logo?.image?.default

	return (
		<footer
			className="bg-vistablue text-seashell sm-px-8 px-4"
			role="contentinfo"
		>
			<div className="section flex flex-wrap items-center justify-start gap-x-12 gap-y-8 py-2 max-sm:flex-col sm:h-[5.5rem]">
				<div className="flex flex-col gap-3 sm:mr-auto">
					<Link className="h3 md:h2 max-w-max" href="/">
						{logoImage ? (
							// <Img
							// 	className="max-h-[1.5em] w-auto"
							// 	image={logoImage}
							// 	alt={logo?.name || title}
							// />
							<div className="aspect-[621/348] max-h-[1.5em] w-auto">
								<FooterLogo />
							</div>
						) : (
							title
						)}
					</Link>

					{blurb && (
						<div className="max-w-sm text-sm text-balance">
							<PortableText value={blurb} />
						</div>
					)}

					{/* <LanguageSwitcher className="mt-4 max-w-max" /> */}
				</div>

				{email && (
					<ClickToCopy
						className="group relative self-center"
						childrenWhenCopied={<VscCheck size={32} />}
						childrenWhenHover={<VscCopy size={32} />}
						value={email}
					>
						<VscMail size={32} className="" />
					</ClickToCopy>
				)}
				<Social className="" />
				<Navigation />
			</div>

			{copyright && (
				<div className="border-canvas/20 mx-auto flex max-w-screen-xl flex-wrap justify-center gap-x-6 gap-y-2 border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-sm [&_a:hover]:underline">
					<PortableText value={copyright} />
				</div>
			)}
		</footer>
	)
}
