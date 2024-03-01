import { useEffect, useState } from 'react'

export const useDebouncedValue = (
	callback: (arg: string | number) => void,
	delay: number
) => {
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {
		if (inputValue) {
			const timer = setTimeout(() => {
				callback(inputValue)
				setInputValue('')
			}, delay)

			return () => clearTimeout(timer)
		}
	}, [inputValue])

	return { inputValue, setInputValue }
}
