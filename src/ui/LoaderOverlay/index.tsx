'use client'

import FlowerLoader from '@/assets/FlowerLoader'
import Flower from '@/assets/flower'
import React, { useEffect, useState } from 'react'

const LoaderOverlay: React.FC = () => {
	const [showLoader, setShowLoader] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowLoader(false)
		}, 1000) // 1 second delay

		return () => clearTimeout(timer)
	}, [])

	if (!showLoader) return null

	return (
		<div className="bg-seashell fixed inset-0 z-50 flex items-center justify-center">
			{/* Replace with your spinner or loader */}
			<FlowerLoader
				className="h-24 w-24 sm:h-36 sm:w-36"
				style={{ animation: 'spin 2.5s linear infinite' }}
			/>
		</div>
	)
}

export default LoaderOverlay
