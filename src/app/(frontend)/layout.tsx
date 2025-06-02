// import { GoogleTagManager } from '@next/third-parties/google'
import Root from '@/ui/Root'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SkipToContent from '@/ui/SkipToContent'
import Announcement from '@/ui/Announcement'
import Header from '@/ui/header'
import Footer from '@/ui/footer'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'

import VisualEditingControls from '@/ui/VisualEditingControls'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { NextIntlClientProvider } from 'next-intl'

import '@/styles/app.css'

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Root>
			<GoogleTagManager gtmId={process.env.GTM_ID!} />
			<GoogleAnalytics gaId={process.env.GA_ID!} />
			<body className="bg-seashell text-ink min-h-screen pt-5 antialiased sm:pt-2">
				<NextIntlClientProvider>
					<NuqsAdapter>
						<SkipToContent />
						<Announcement />
						<Header />
						<main
							id="main-content"
							role="main"
							tabIndex={-1}
							className="flex min-h-screen flex-col"
						>
							{children}
							{/* <Footer /> */}
						</main>

						<VisualEditingControls />
					</NuqsAdapter>
				</NextIntlClientProvider>

				<Analytics />
				<SpeedInsights />
			</body>
		</Root>
	)
}
