import { defineField } from 'sanity'
import { VscSymbolColor } from 'react-icons/vsc'
import { PiFlower } from 'react-icons/pi'
import { FaUnderline, FaXRay } from 'react-icons/fa6'
import { BsFlower2 } from 'react-icons/bs'

export default (name: string, group: string) =>
	defineField({
		name,
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
					decorators: [
						{
							title: 'double flower',
							value: 'doubleflower',
							icon: BsFlower2,
						},
						{
							title: 'asterix flower',
							value: 'asterixflower',
							icon: PiFlower,
						},
						{
							title: 'card underline',
							value: 'cardunderline',
							icon: FaUnderline,
						},
						{
							title: 'hero underline',
							value: 'herounderline',
							icon: FaUnderline,
						},
						{
							title: 'rays down right',
							value: 'rays',
							icon: FaXRay,
						},
						{
							title: 'strong',
							value: 'strong',
						},
					],
					annotations: [
						{
							name: 'color',
							type: 'object',
							title: 'Text Color',
							icon: VscSymbolColor,
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
		group,
	})
