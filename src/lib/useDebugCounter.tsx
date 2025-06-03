import React, { useState } from 'react'

type CounterValues = Record<string, number>

export function useDebugCounter<T extends CounterValues>(initialCounters: T) {
	const [counters, setCounters] = useState<T>(initialCounters)

	const increment = (key: keyof T, step = 1) =>
		setCounters((prev) => ({
			...prev,
			[key]: prev[key] + step,
		}))

	const decrement = (key: keyof T, step = 1) =>
		setCounters((prev) => ({
			...prev,
			[key]: prev[key] - step,
		}))

	const DebugPanel: React.FC = () => (
		<div className="absolute top-4 right-4 z-50 min-w-[200px] space-y-3 rounded border border-gray-700 bg-gray-900 p-4 font-mono text-white shadow-xl">
			<div className="text-sm text-lime-400">📟 DEBUG PANEL</div>
			{Object.entries(counters).map(([key, value]) => (
				<div key={key} className="rounded bg-gray-800 p-2">
					<div className="text-sm text-gray-300">
						{key}: <span className="text-cyan-300">{value}</span>
					</div>
					<div className="mt-2 flex gap-2">
						<button
							onClick={() => increment(key as keyof T)}
							className="rounded bg-green-700 px-2 py-1 text-xs hover:bg-green-600"
						>
							+1
						</button>
						<button
							onClick={() => increment(key as keyof T, 10)}
							className="rounded bg-green-700 px-2 py-1 text-xs hover:bg-green-600"
						>
							+10
						</button>
						<button
							onClick={() => decrement(key as keyof T, 10)}
							className="rounded bg-red-700 px-2 py-1 text-xs hover:bg-red-600"
						>
							-10
						</button>
						<button
							onClick={() => decrement(key as keyof T)}
							className="rounded bg-red-700 px-2 py-1 text-xs hover:bg-red-600"
						>
							-1
						</button>
					</div>
				</div>
			))}
		</div>
	)

	return {
		...counters,
		DebugPanel,
	}
}
