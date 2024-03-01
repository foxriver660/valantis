import { useMemo } from 'react'
import { ProductsResponse } from '../types/types'

export const useUniqueProducts = (
	filteredProducts: ProductsResponse | undefined,
	products: ProductsResponse | undefined
) => {
	return useMemo(() => {
		const data = filteredProducts?.result || products?.result || []

		const uniqueIds = new Set()
		return data.filter(item => {
			if (!uniqueIds.has(item.id)) {
				uniqueIds.add(item.id)
				return true
			}
			return false
		})
	}, [filteredProducts, products])
}
