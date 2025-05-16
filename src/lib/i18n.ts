import type { Language } from '@sanity/document-internationalization'

export const supportedLanguages = [
	{ id: 'fr', title: 'Français' },
	{ id: 'en', title: 'English' },
	// { id: 'ja', title: '日本語' },
] as const as Language[]

export const languages = supportedLanguages.map((lang) => lang?.id)

export const DEFAULT_LANG = languages[0] ?? 'en'

export type Lang = (typeof languages)[number]

export const langCookieName = `sanitypress-${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}-lang`
