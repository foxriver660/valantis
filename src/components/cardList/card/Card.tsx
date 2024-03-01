import { Gem } from 'lucide-react'
import { FC, memo } from 'react'

type Props = {
	id: string
	product: string
	brand: string
	price: number
}

const Card: FC<Props> = memo(({ id, product, brand, price }) => {
	return (
		<div className='max-w-sm rounded-lg overflow-hidden shadow-xl transform transition-all hover:scale-105'>
			<div className='bg-gray-200 h-12 flex items-center justify-center text-xs text-gray-600 text-center mb-2'>
				ID: {id}
			</div>
			<Gem className='m-auto' />
			<div className='px-4 py-2'>
				<div className=' text-center font-bold text-sm mb-1 overflow-hidden line-clamp-3 text-gray-900'>
					{product}
				</div>
				{brand && (
					<p className='text-gray-700 text-center text-sm'>
						Брэнд: <span className='font-bold text-blue-600'>{brand}</span>
					</p>
				)}
				<p className='text-gray-700 text-center text-sm'>
					Цена: <span className='font-bold text-green-800'> {price}₽ </span>
				</p>
			</div>
		</div>
	)
})

export default Card
