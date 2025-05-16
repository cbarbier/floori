import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from 'sanitypress-utils'
import { VscHome } from 'react-icons/vsc'
import { count } from '@/lib/utils'
import { colorField } from '../fragments'

export default defineType({
	name: 'fl_icons',
	title: 'Floori Icons',
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
		defineField({
			name: 'icons',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'icon',
					title: 'card',
					fields: [
						defineField({
							name: 'image',
							type: 'image',
						}),
						defineField({
							name: 'text',
							type: 'array',
							of: [{ type: 'block' }],
						}),
					],
				},
			],
			group: 'content',
		}),
	],
	preview: {
		select: {
			icons: 'icons',
		},
		prepare: ({ icons }) => ({
			title: 'list of icons with text',
			subtitle: `with ${count(icons, 'icon')}`,
		}),
	},
})
