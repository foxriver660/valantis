import md5 from 'md5'
import { API_URL, ITEMS_PER_PAGE } from '../constants/constants'
import { getToday } from '../helpers/getToday'
import { Filters } from '../types/types'

class DataFetcher {
	private apiUrl: string
	private headers: Record<string, string>

	constructor(apiUrl: string, headers: Record<string, string>) {
		this.apiUrl = apiUrl
		this.headers = headers
	}

	private async fetchData(
		action: string,
		params: Record<string, string[] | number | string | null | undefined>
	) {
		const res = await fetch(this.apiUrl, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({ action, params }),
		})
		if (!res.ok) {
			console.log('ERROR:', res.status, res.statusText)
			throw new Error('Ошибка при загрузке')
		}
		return res.json()
	}

	public async getAllIds() {
		return this.fetchData('get_ids', { ids: null })
	}

	public async getIds(offset: number) {
		return this.fetchData('get_ids', {
			offset: offset * ITEMS_PER_PAGE,
			limit: ITEMS_PER_PAGE,
		})
	}

	public async getItems(result: { result: string[] }) {
		return this.fetchData('get_items', {
			ids: result.result,
		})
	}

	public async getAllBrands() {
		return this.fetchData('get_fields', { field: 'brand' })
	}

	public async getFilteredProducts({ brand, price, product }: Filters) {
		const response = await this.fetchData('filter', { brand, price, product })
		const { result } = await response
		return this.fetchData('get_items', { ids: result })
	}
}

const headers = {
	'Content-Type': 'application/json',
	'X-Auth': md5('Valantis_' + getToday()),
}

export const dataFetcher = new DataFetcher(API_URL, headers)
