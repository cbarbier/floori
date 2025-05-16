import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { DEFAULT_LANG, langCookieName, languages } from '@/lib/i18n'
import { cookies } from 'next/headers'

export default getRequestConfig(async ({ requestLocale }) => {
	const cookieStore = await cookies()

	// Typically corresponds to the `[locale]` segment
	const requested = cookieStore.get(langCookieName)?.value
	console.log('HERE ############# arg', cookieStore.get(langCookieName))
	const locale = hasLocale(languages, requested) ? requested : DEFAULT_LANG

	return {
		locale,
		messages: (await import(`../../messages/${locale}.json`)).default,
	}
})
