import { supportedLanguages } from '@/lib/i18n'
import { getTranslations } from '@/sanity/lib/queries'
import type { ComponentProps } from 'react'
import FL_Switcher from './FL_Switcher'

export default async function FL_LanguageSwitcher(
	props: ComponentProps<'div'>,
) {
	if (supportedLanguages.length < 2) return null

	const translations = await getTranslations()
	if (!translations) return null

	return <FL_Switcher translations={translations} {...props} />
}
