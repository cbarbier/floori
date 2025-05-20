import { cn } from '@/lib/utils'
import css from './Toggle.module.css'

export default function Toggle() {
	return (
		<label className="[grid-area:toggle] sm:hidden">
			<input
				id="header-toggle"
				className="header-open"
				type="checkbox"
				hidden
			/>

			<label className={cn(css.hamb)} htmlFor="header-toggle">
				<span className={cn(css.line, 'header-open:cross-toggle')}></span>
			</label>
		</label>
	)
}
