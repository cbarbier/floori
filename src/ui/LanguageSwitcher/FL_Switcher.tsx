'use client'

import { useEffect, useState, type ComponentProps } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { DEFAULT_LANG, supportedLanguages } from '@/lib/i18n'
import { setLangCookie } from './actions'
import { VscGlobe, VscLoading } from 'react-icons/vsc'
import { cn } from '@/lib/utils'
import { Language } from '@sanity/document-internationalization'

export default function FL_Switcher({
	translations: T,
	className,
	...props
}: {
	translations: Sanity.Translation[]
} & ComponentProps<'div'>) {
	const [isHovered, setIsHovered] = useState(false)
	const [loading, setLoading] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		setLoading(false)
	}, [pathname])

	const available = T.find((t) =>
		[
			t.slug,
			...(t.translations
				?.filter((x) => x)
				?.flatMap((p) => [p.slug, p.slugBlogAlt]) ?? []),
		].includes(pathname),
	)

	const currentLang =
		supportedLanguages
			.find((x) => pathname.split('/').find((p) => p === x?.id))
			?.id?.toString() ?? DEFAULT_LANG

	const otherLang = supportedLanguages
		.find((x) => x.id !== currentLang)
		?.id?.toString()
	const other = available?.translations?.find((x) => x?.language === otherLang)
	return (
		<div
			className={cn(
				'grid aspect-square w-[2.5rem] place-content-center',
				'border-crab rounded-[1rem] border-2',
				'flex items-center gap-2',
			)}
			title="Change language"
		>
			<button
				className={cn(
					'focus:border-canvas/30 font-cdis text-crab disabled:text-crab/50 text-[1rem] uppercase outline-none',
					{
						'animate-pulse': loading,
					},
				)}
				disabled={!other}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={(e) => {
					if (!other) return
					setLoading(true)
					setLangCookie(otherLang)
					redirect(other?.slug)
				}}
			>
				{isHovered ? otherLang : currentLang}
			</button>
		</div>
	)
}
