import { ChevronsLeft, ChevronsRight, Loader2 } from 'lucide-react'
import { FC, memo } from 'react'
import { ITEMS_PER_PAGE } from '../../constants/constants'
import { useGlobalContext } from '../../context'

type Props = {
	pageIndex: number
	setPageIndex: (arg: number) => void
}

const PaginationButtons: FC<Props> = memo(({ pageIndex, setPageIndex }) => {
	const { allIds, filteredProducts } = useGlobalContext()

	const totalItems = filteredProducts
		? filteredProducts.result.length
		: allIds
		? allIds.result.length
		: 0
	const totalPages = filteredProducts
		? 1
		: allIds
		? Math.ceil(allIds.result.length / ITEMS_PER_PAGE)
		: 0

	const handlePrevClick = () => {
		setPageIndex(pageIndex - 1)
	}

	const handleNextClick = () => {
		setPageIndex(pageIndex + 1)
	}
	const handleTotalPagesClick = () => {
		setPageIndex(totalPages - 1)
	}
	return (
		<div className='flex items-center'>
			<button
				onClick={handlePrevClick}
				disabled={pageIndex === 0}
				className={`hover:scale-125 mr-1 p-2 rounded-md ${
					pageIndex === 0 ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-300'
				}`}
			>
				<ChevronsLeft className='w-6 h-6' />
			</button>
			<div className='flex items-center'>
				Страница: {filteredProducts ? 1 : pageIndex + 1} из
				{totalPages ? (
					<p
						className='pl-1 hover:underline cursor-pointer text-blue-700 font-bold'
						onClick={handleTotalPagesClick}
					>
						{totalPages}
					</p>
				) : (
					<Loader2 className='animate-spin' />
				)}
			</div>
			<button
				onClick={handleNextClick}
				disabled={pageIndex === totalPages - 1 || totalPages === 0}
				className={`hover:scale-125 ml-1 p-2 rounded-md ${
					pageIndex === totalPages - 1 || totalPages === 0
						? 'bg-gray-100 cursor-not-allowed'
						: 'bg-gray-300'
				}`}
			>
				<ChevronsRight className='w-6 h-6' />
			</button>
			<span className='pl-1'>Найдено товаров: {totalItems}</span>
		</div>
	)
})

export default PaginationButtons
