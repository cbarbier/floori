function easeOutCubic(t: number): number {
	return 1 - Math.pow(1 - t, 3)
}

function linear(t: number) {
	return t
}

function easeInOutQuad(t: number) {
	return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

export { easeInOutQuad, easeOutCubic, linear }
