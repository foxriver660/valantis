 
import { ChangeEvent, memo, useMemo, useState } from 'react'
import { useGlobalContext } from '../../context'

const BrandFilter = memo(() => {
	const { allBrands, filters, setFilters, isLoadingFilteredProducts } =
		useGlobalContext()
	const [selectedBrand, setSelectedBrand] = useState('')

	const filteredBrands = useMemo(() => {
		if (allBrands) {
			return [
				...new Set(
					allBrands.result.filter((item: null | string) => item !== null)
				),
			]
		}
		return []
	}, [allBrands])

	const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const newBrand = event.target.value
		setSelectedBrand(newBrand)
		setFilters({ brand: newBrand })
	}

	return (
		<select
			className='w-full p-2 mb-4 rounded border scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-auto'
			value={filters?.brand ? filters?.brand : selectedBrand}
			name='brand'
			onChange={handleFilterChange}
			disabled={isLoadingFilteredProducts}
		>
			<option className='text-sm' value='' hidden>
				Выберите бренд
			</option>
			{filteredBrands.length > 0 ? (
				filteredBrands.map(brand => (
					<option
						key={brand as string}
						value={brand as string}
						className='text-xs'
					>
						{brand as string}
					</option>
				))
			) : (
				<option disabled>Загрузка...</option>
			)}
		</select>
	)
})

export default BrandFilter
