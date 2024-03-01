 
import React, { createContext, useMemo, useState } from 'react'
import useSWR from 'swr'
import { dataFetcher } from '../api/fetcher'
import {
	Filters,
	ProductsBrandsResponse,
	ProductsIdsResponse,
	ProductsResponse,
} from '../types/types'

export interface IProductsContextProps {
	allIds?: ProductsIdsResponse
	allBrands?: ProductsBrandsResponse
	isLoadingFilteredProducts: boolean
	filteredProducts: ProductsResponse | null
	setFilteredProducts: React.Dispatch<
		React.SetStateAction<ProductsResponse | null>
	>
	filters: Filters | null
	setFilters: React.Dispatch<React.SetStateAction<Filters>>
}

export const GlobalContext = createContext<IProductsContextProps | undefined>(
	undefined
)

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
	const [filteredProducts, setFilteredProducts] =
		useState<ProductsResponse | null>(null)
	const [filters, setFilters] = useState<Filters>(null as unknown as Filters)

	const { data: allIds } = useSWR<ProductsIdsResponse>('allIds', () =>
		dataFetcher.getAllIds()
	)
	const { data: allBrands } = useSWR<ProductsBrandsResponse>('allBrands', () =>
		dataFetcher.getAllBrands()
	)

	const { isLoading: isLoadingFilteredProducts } = useSWR<ProductsResponse>(
		filters ? ['filteredProducts', filters] : null,
		() => dataFetcher.getFilteredProducts(filters),
		{
			onSuccess: newData => {
				setFilteredProducts(newData)
			},
		}
	)

	const contextValue: IProductsContextProps = useMemo(() => {
		return {
			allIds,
			allBrands,
			isLoadingFilteredProducts,
			filteredProducts,
			setFilteredProducts,
			filters,
			setFilters,
		}
	}, [allIds, allBrands, isLoadingFilteredProducts, filteredProducts, filters])

	return (
		<GlobalContext.Provider value={contextValue}>
			{children}
		</GlobalContext.Provider>
	)
}
