import { ChangeEvent, memo } from 'react'
import { DEBOUNCE_DELAY } from '../../constants/constants'
import { useGlobalContext } from '../../context'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'

const PriceFilter = memo(() => {
	const { setFilters, isLoadingFilteredProducts } = useGlobalContext()
	const { inputValue, setInputValue } = useDebouncedValue(value => {
		setFilters({ price: Number(value) })
	}, DEBOUNCE_DELAY)

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	return (
		<input
			disabled={isLoadingFilteredProducts}
			min={0}
			name='price'
			value={inputValue}
			onChange={handleInputChange}
			type='number'
			placeholder='Поиск по цене'
			className='w-full p-2 mb-4 rounded border text-sm'
		/>
	)
})

export default PriceFilter
