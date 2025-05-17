import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { VscPerson } from 'react-icons/vsc'
import { getBlockText } from 'sanitypress-utils'

export default defineType({
	name: 'fl_founder',
	title: 'Floori Founder',
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
			name: 'bio',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'H1', value: 'h1' },
						{ title: 'H2', value: 'h2' },
						{ title: 'H3', value: 'h3' },
						{ title: 'H4', value: 'h4' },
						{ title: 'Quote', value: 'blockquote' },
					],
					marks: {
						annotations: [
							{
								name: 'color',
								type: 'object',
								title: 'Text Color',
								fields: [
									{
										name: 'color',
										title: 'Color',
										type: 'string',
										options: {
											list: [
												{ title: 'black', value: '#230903' },
												{ title: 'white', value: '#ffffff' },
												{ title: 'deepocean', value: '#0657de' },
												{ title: 'butterschotch', value: '#f99f00' },
												{ title: 'seashell', value: '#f4eae5' },
												{ title: 'crab', value: '#fe6641' },
												{ title: 'vistablue', value: '#85aff9' },
											],
											layout: 'dropdown',
										},
									},
								],
							},
						],
					},
				},
			],
			group: 'content',
		}),
		defineField({
			name: 'asset',
			type: 'img',
			group: 'content',
		}),
	],
	preview: {
		select: {
			title: 'bio',
		},
		prepare: ({ title }) => ({
			title: getBlockText(title),
			subtitle: 'biography',
			media: VscPerson,
		}),
	},
})
