/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from 'react'
import { GlobalContext } from './context'

export const useGlobalContext = (): any => {
	const context = useContext(GlobalContext)
	if (!context) {
		throw new Error('Ошибка')
	}
	return context
}
