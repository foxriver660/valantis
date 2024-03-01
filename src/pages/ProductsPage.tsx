import { useState } from 'react'
import {
	BrandFilter,
	CardsList,
	PaginationButtons,
	PriceFilter,
	ProductFilter,
} from '../components'

const ProductsPage = () => {
	const [pageIndex, setPageIndex] = useState(0)

	return (
		<div className='flex'>
			<div className='min-h-screen w-1/4 p-4 bg-gray-300'>
				<BrandFilter />
				<PriceFilter />
				<ProductFilter />
			</div>
			<div className='p-2 flex flex-col w-full items-center'>
				<PaginationButtons pageIndex={pageIndex} setPageIndex={setPageIndex} />
				<div className='w-full '>
					<CardsList index={pageIndex} />
					<div style={{ display: 'none' }}>
						<CardsList index={pageIndex + 1} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductsPage
