import type { Color } from '~/types/Color.js'
import type { Size } from '~/types/Size.js'

export type ProductPhoto = {
  url: string
  name: string
}

export interface Product {
  id: number
  name: string
  photos: ProductPhoto[]
  categoryId: number
  colors: Color[]
  defaultColor: Color
  sizes: Size[]
}
