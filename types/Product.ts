import type { Color } from '~/types/Color'
import type { Size } from '~/types/Size'

type PhotoURLs = {
  [each in Color]: string
}

export type ProductSort = 'alphabetically-a-z' | 'alphabetically-z-a' | 'price-descending' | 'price-ascending'

export type ProductSortWithText = {
  sort: ProductSort
  text: string
}

export interface Product {
  id: string
  name: string
  nameKebab: string
  description: string
  category: string,
  colors: Color[]
  sizes: Size[]
  photoUrls: PhotoURLs
  priceInCents: number
}

export interface ProductForCart extends Product {
  size: Size,
  color: Color
}

export interface ProductFilterConditions {
  colors: Color[]
  sizes: Size[]
}
