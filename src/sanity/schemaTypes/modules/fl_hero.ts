import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from 'sanitypress-utils'
import { VscColorMode, VscHome, VscSymbolColor } from 'react-icons/vsc'
import { PiFlower } from 'react-icons/pi'
import richtextBuilder from '../fragments/richtext'

export default defineType({
	name: 'fl_hero',
	title: 'Floori Hero',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'options',
			title: 'Module options',
			type: 'module-options',
			group: 'options',
		}),
		richtextBuilder('title', 'content'),
		defineField({
			name: 'subtitle',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'cta',
			title: 'Call-to-action',
			type: 'cta',
			group: 'content',
		}),
		richtextBuilder('calendartitle', 'content', 'title of calendar'),
		defineField({
			name: 'calendar',
			type: 'boolean',
			group: 'options',
			initialValue: true,
		}),
	],
	preview: {
		select: {
			content: 'title',
		},
		prepare: ({ content }) => ({
			title: getBlockText(content),
			subtitle: 'Hero',
			media: VscHome,
		}),
	},
})
