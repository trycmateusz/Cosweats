import type { Color } from '~/types/Color'
import type { Size } from '~/types/Size'
import type { Category } from '~/types/Category'

type PhotoURLs = {
  [each in Color]: string
}

interface ProductBase {
  id: number
  name: string
  nameKebab: string
  description: string
  category: Category
}

export interface Product extends ProductBase {
  colors: Color[]
  sizes: Size[]
  photoUrls: PhotoURLs
  priceInCents: number
}

export interface ProductActive extends ProductBase {
  size: Size
  color: Color
}
