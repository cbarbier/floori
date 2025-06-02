import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from 'sanitypress-utils'
import { VscHome } from 'react-icons/vsc'
import { count } from '@/lib/utils'
import { colorField } from '../fragments'
import { FaUnderline } from 'react-icons/fa6'
import richtextBuilder from '../fragments/richtext'

export default defineType({
	name: 'fl_cards',
	title: 'Floori Cards',
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
		richtextBuilder('subtitle', 'content'),
		defineField({
			name: 'cards',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'card',
					title: 'card',
					fields: [
						defineField({
							name: 'front',
							type: 'string',
						}),
						defineField({
							name: 'back',
							type: 'array',
							of: [
								{
									type: 'block',
								},
							],
						}),
						colorField,
					],
				},
			],
			group: 'content',
		}),
		defineField({
			name: 'cta',
			title: 'Call-to-action',
			type: 'cta',
			group: 'content',
		}),
	],
	preview: {
		select: {
			content: 'title',
			cards: 'cards',
		},
		prepare: ({ content, cards }) => ({
			title: getBlockText(content),
			subtitle: `with ${count(cards, 'card')}`,
			media: VscHome,
		}),
	},
})
