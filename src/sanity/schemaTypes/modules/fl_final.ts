import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { VscMegaphone } from 'react-icons/vsc'
import { getBlockText } from 'sanitypress-utils'

export default defineType({
	name: 'fl_final',
	title: 'Floori Final Section',
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
			name: 'title',
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
			name: 'subtitle',
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
			name: 'cta',
			title: 'Call-to-action',
			type: 'cta',
			group: 'content',
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
		},
		prepare: ({ title, subtitle }) => ({
			title: getBlockText(title),
			subtitle: getBlockText(subtitle),
			media: VscMegaphone,
		}),
	},
})
