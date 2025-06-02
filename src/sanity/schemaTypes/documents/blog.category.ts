import { defineField, defineType } from 'sanity'
import { VscTag } from 'react-icons/vsc'
import colorField from '../fragments/colorField'

export default defineType({
	name: 'blog.category',
	title: 'Blog category',
	type: 'document',
	icon: VscTag,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
			},
			validation: (Rule) => Rule.required(),
		}),
		colorField,
	],
})
