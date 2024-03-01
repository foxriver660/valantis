import { ChangeEvent, memo } from 'react'
import { DEBOUNCE_DELAY } from '../../constants/constants'
import { useGlobalContext } from '../../context'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'

const ProductFilter = memo(() => {
	const { setFilters, isLoadingFilteredProducts } = useGlobalContext()

	const { inputValue, setInputValue } = useDebouncedValue(value => {
		setFilters({ product: value })
	}, DEBOUNCE_DELAY)

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	return (
		<input
			disabled={isLoadingFilteredProducts}
			name='product'
			value={inputValue}
			onChange={handleInputChange}
			type='text'
			placeholder='Поиск по названию'
			className='w-full p-2 mb-4 rounded border text-sm'
		/>
	)
})

export default ProductFilter
