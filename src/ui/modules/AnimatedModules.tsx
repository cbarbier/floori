import AccordionList from './AccordionList'
import BlogFrontpage from './blog/BlogFrontpage'
import BlogList from './blog/BlogList'
import BlogPostContent from './blog/PostContent'
import Breadcrumbs from './Breadcrumbs'
import Callout from './Callout'
import CardList from './CardList'
import CustomHTML from './CustomHTML'
import FlagList from './FlagList'
import Hero from './Hero'
import HeroSplit from './HeroSplit'
import HeroSaaS from './HeroSaaS'
import LogoList from './LogoList'
import RichtextModule from './RichtextModule'
import ScheduleModule from './ScheduleModule'
import SearchModule from './SearchModule'
import StatList from './StatList'
import StepList from './StepList'
import TabbedContent from './TabbedContent'
import TestimonialList from './TestimonialList'
import TestimonialFeatured from './TestimonialFeatured'

// floori
import FL_Hero from './FL_Hero/FL_Hero'
import FL_Cards from './FL_Cards/FL_Cards'
import FL_Icons from './FL_Icons/FL_Icons'
import FL_Cloud from './FL_Cloud/FL_Cloud'
import FL_Slider from './FL_Slider/FL_Slider'
import FL_Definition from './FL_Definition/FL_Definition'
import FL_Numbers from './FL_Numbers/FL_Numbers'
import FL_Final from './FL_Final'
import FL_Founder from './FL_Founder'

import dynamic from 'next/dynamic'
import { createDataAttribute } from 'next-sanity'
import { FadeInSection } from '../animations/FadeInSection'

const MODULE_MAP = {
	fl_hero: FL_Hero,
	fl_cards: FL_Cards,
	fl_icons: FL_Icons,
	fl_cloud: FL_Cloud,
	fl_slider: FL_Slider,
	fl_definition: FL_Definition,
	fl_numbers: FL_Numbers,
	fl_final: FL_Final,
	fl_founder: FL_Founder,

	'accordion-list': AccordionList,
	'blog-frontpage': BlogFrontpage,
	'blog-list': BlogList,
	'blog-post-content': BlogPostContent,
	breadcrumbs: Breadcrumbs,
	callout: Callout,
	'card-list': CardList,
	'creative-module': dynamic(() => import('./CreativeModule')),
	'custom-html': CustomHTML,
	'flag-list': FlagList,
	hero: Hero,
	'hero.split': HeroSplit,
	'hero.saas': HeroSaaS,
	'logo-list': LogoList,
	'person-list': dynamic(() => import('./PersonList')),
	'pricing-list': dynamic(() => import('./PricingList')),
	'richtext-module': RichtextModule,
	'schedule-module': ScheduleModule,
	'search-module': SearchModule,
	'stat-list': StatList,
	'step-list': StepList,
	'tabbed-content': TabbedContent,
	'testimonial-list': TestimonialList,
	'testimonial.featured': TestimonialFeatured,
} as const

export default function Modules({
	modules,
	page,
	post,
}: {
	modules?: Sanity.Module[]
	page?: Sanity.Page
	post?: Sanity.BlogPost
}) {
	const getAdditionalProps = (module: Sanity.Module) => {
		switch (module._type) {
			case 'blog-post-content':
				return { post }
			case 'breadcrumbs':
				return { currentPage: post || page }
			default:
				return {}
		}
	}

	return (
		<>
			{modules?.map((module) => {
				if (!module) return null

				const Component = MODULE_MAP[module._type as keyof typeof MODULE_MAP]

				if (!Component) return null

				return (
					<FadeInSection y="400px" key={'animated-' + module._key}>
						<Component
							{...module}
							{...getAdditionalProps(module)}
							data-sanity={
								!!page?._id &&
								createDataAttribute({
									id: page._id,
									type: page?._type,
									path: `page[_key == "${module._key}"]`,
								}).toString()
							}
							key={module._key}
						/>
					</FadeInSection>
				)
			})}
		</>
	)
}
