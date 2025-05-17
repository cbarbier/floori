import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { VscMegaphone } from 'react-icons/vsc'

export default defineType({
	name: 'fl_definition',
	title: 'Floori Definition',
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
			name: 'definition',
			type: 'string',
		}),
		defineField({
			name: 'text',
			type: 'text',
		}),
		defineField({
			name: 'text2',
			type: 'text',
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
			content: 'definition',
		},
		prepare: ({ content }) => ({
			title: content,
			media: VscMegaphone,
		}),
	},
})
