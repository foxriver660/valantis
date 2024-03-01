 
import { Loader2 } from 'lucide-react'
import { FC, memo } from 'react'
import useSWR from 'swr'
import { dataFetcher } from '../../api/fetcher'
import { useGlobalContext } from '../../context'
import { useUniqueProducts } from '../../hooks'
import { Product, ProductsResponse } from '../../types/types'
import Card from './card/Card'

type Props = {
	index: number
}

const CardsList: FC<Props> = memo(({ index }) => {
	const { filteredProducts, isLoadingFilteredProducts, filters } =
		useGlobalContext()

	const { data: ids } = useSWR(['ids', index], () => dataFetcher.getIds(index))
	const { data: products, isLoading: isLoadingProducts } =
		useSWR<ProductsResponse>(ids ? ['items', ids] : null, () =>
			dataFetcher.getItems(ids)
		)

	const uniqueProducts = useUniqueProducts(filteredProducts, products)

	return (
		<div className='p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
			{isLoadingProducts || isLoadingFilteredProducts ? (
				<Loader2 className='animate-spin' />
			) : (
				uniqueProducts.map((item: Product) => (
					<Card
						key={item.id}
						id={item.id}
						product={item.product}
						brand={item.brand}
						price={item.price}
					/>
				))
			)}

			{!isLoadingProducts &&
				!isLoadingFilteredProducts &&
				filteredProducts &&
				filteredProducts.result.length === 0 && (
					<div className='col-span-6 text-red-600 font-bold'>
						По запросу "{filters.price || filters.product}" ничего не найдено
					</div>
				)}
		</div>
	)
})

export default CardsList
