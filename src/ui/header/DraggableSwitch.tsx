import React, { useState, useRef } from 'react'

const DraggableSwitch: React.FC = () => {
	const [isOn, setIsOn] = useState<boolean>(false)
	const [offsetX, setOffsetX] = useState<number>(0)
	const buttonRef = useRef<HTMLDivElement | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!buttonRef.current || !containerRef.current) return

		const startX = e.clientX
		const buttonWidth = buttonRef.current.offsetWidth
		const containerWidth = containerRef.current.offsetWidth

		const handleMouseMove = (event: MouseEvent) => {
			let newOffset = event.clientX - startX
			newOffset = Math.max(
				0,
				Math.min(containerWidth - buttonWidth - 8, newOffset),
			)
			setOffsetX(newOffset)
		}

		const handleMouseUp = () => {
			if (!buttonRef.current || !containerRef.current) return

			const threshold = (containerWidth - buttonWidth) / 2
			setIsOn(offsetX > threshold)
			setOffsetX(offsetX > threshold ? containerWidth - buttonWidth - 8 : 0)

			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	return (
		<div
			ref={containerRef}
			className={`relative h-8 w-16 ${isOn ? 'bg-green-500' : 'bg-gray-400'} flex cursor-pointer items-center rounded-full p-1 transition-all`}
			onClick={() => {
				if (!buttonRef.current || !containerRef.current) return
				setIsOn(!isOn)
				setOffsetX(
					isOn
						? 0
						: containerRef.current.offsetWidth -
								buttonRef.current.offsetWidth -
								8,
				)
			}}
		>
			<div
				ref={buttonRef}
				className="absolute h-6 w-6 rounded-full bg-white shadow-md transition-all"
				style={{ transform: `translateX(${offsetX}px)` }}
				onMouseDown={handleMouseDown}
			/>
		</div>
	)
}

export default DraggableSwitch
