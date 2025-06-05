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
			<div className="section flex flex-wrap items-center justify-start gap-y-4 py-2 max-sm:justify-between sm:h-[5.5rem] sm:gap-x-12 sm:gap-y-8">
				<div className="flex flex-col gap-3 max-sm:w-fit sm:mr-auto">
					<Link className="h3 md:h2 max-w-max" href="/">
						{logoImage ? (
							<div className="aspect-[621/348] max-h-[1.5em]">
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
				</div>

				{email && (
					<ClickToCopy
						className="group relative max-sm:mr-6 max-sm:w-fit sm:self-center"
						childrenWhenCopied={<VscCheck size={32} />}
						childrenWhenHover={<VscCopy size={32} />}
						value={email}
					>
						<VscMail size={32} className="" />
					</ClickToCopy>
				)}
				<Social className="max-sm:w-fit" />
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
