import { defineField } from 'sanity'

export default defineField({
	name: 'color',
	title: 'Color with list',
	type: 'color',
	options: {
		colorList: [
			'#230903',
			'#ffffff',
			'#0657de',
			'#f99f00',
			'#f4eae5',
			'#fe6641',
			'#85aff9',
		],
	},
})
