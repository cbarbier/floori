import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from 'sanitypress-utils'
import { VscColorMode, VscGraphScatter } from 'react-icons/vsc'
import { count } from '@/lib/utils'

export default defineType({
	name: 'fl_numbers',
	title: 'Floori numbers',
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
								icon: VscColorMode,
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
			name: 'numbers',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'stat',
					fields: [
						defineField({
							name: 'value',
							type: 'number',
						}),
						defineField({
							name: 'unit',
							type: 'string',
						}),
						defineField({
							name: 'text',
							type: 'array',
							of: [
								{
									type: 'block',
									styles: [{ title: 'Normal', value: 'normal' }],
									marks: {
										decorators: [
											{
												title: 'Source',
												value: 'source',
											},
											{
												title: 'strong',
												value: 'strong',
											},
										],
									},
								},
							],
						}),
					],
					preview: {
						select: {
							value: 'value',
							unit: 'unit',
							text: 'text',
						},
						prepare: ({ value, unit, text }) => ({
							title: value + unit,
							subtitle: getBlockText(text),
							icons: VscGraphScatter,
						}),
					},
				},
			],
			group: 'content',
		}),
	],
	preview: {
		select: {
			title: 'title',
			numbers: 'numbers',
		},
		prepare: ({ title, numbers }) => ({
			title: getBlockText(title),
			subtitle: `with ${count(numbers, 'stat')}`,
		}),
	},
})
