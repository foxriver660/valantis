export type Filters = { brand?: string; price?: number; product?: string }
export type Product = {
	id: string
	product: string
	brand: string
	price: number
}
// RESPONSE
export type ProductsResponse = { result: Product[] }
export type ProductsIdsResponse = { result: string[] }
export type ProductsBrandsResponse = { result: (string | null)[] }
