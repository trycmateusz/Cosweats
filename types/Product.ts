import type { Color } from '~/types/Color'
import type { Size } from '~/types/Size'

type PhotoURLs = {
  [each in Color]: string
}

export interface Product {
  id: number
  name: string
  nameKebab: string
  description: string
  colors: Color[]
  sizes: Size[]
  photoUrls: PhotoURLs
  priceInCents: number
}
