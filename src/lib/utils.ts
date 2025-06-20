import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function count(
	arr: Array<any> | number,
	singular: string = 'item',
	plural?: string,
) {
	const num = typeof arr === 'number' ? arr : arr?.length || 0
	return `${num || 0} ${num === 1 ? singular : plural || singular + 's'}`
}

export function debounce<T extends (...args: any[]) => void>(
	func: T,
	delay: number = 1000, // 1 sec
): (...args: Parameters<T>) => void {
	let timeoutId: NodeJS.Timeout | null = null

	return function (this: any, ...args: Parameters<T>) {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}

		timeoutId = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}

export const { format: formatCurrency } = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
})

export function slug(str: string) {
	return str
		.toLowerCase()
		.replace(/[\s\W]+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '')
}

export function countDecimals(value: number): number {
	if (Math.floor(value) === value) return 0
	const valueStr = value.toExponential()
	const [mantissa, exponent] = valueStr.split('e')
	const decimals = (mantissa.split('.')[1] || '').length
	const exp = parseInt(exponent, 10)
	return Math.max(0, decimals - exp)
}

export function scrollToSelector(selector: string) {
	if (typeof window !== 'undefined')
		document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}
