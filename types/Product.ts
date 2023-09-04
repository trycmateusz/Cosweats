import type { Color } from '~/types/Color'
import type { Size } from '~/types/Size'

export interface Product {
  id: number
  name: string
  nameKebab: string
  colors: Color[]
  defaultColor: Color
  sizes: Size[]
  photoURLs: string[]
}
