import type { Color } from '~/types/Color'
import type { Size } from '~/types/Size'

type PhotoURLs = {
  [each in Color]: string
}

export type ProductCategory = 'sweatshirts'

export interface Product {
  id: string
  name: string
  nameKebab: string
  description: string
  category: ProductCategory,
  colors: Color[]
  sizes: Size[]
  photoUrls: PhotoURLs
  priceInCents: number
}

export interface ProductForCart extends Product {
  size: Size,
  color: Color
}
