import { fetchCollection } from '~/services/fetch'
import type { Product, ProductForCart, ProductCategory } from '~/types/Product.js'
import type { Color } from 'types/Color'
import type { Size } from 'types/Size'

export const useProductStore = defineStore('ProductStore', () => {
  const active = ref<ProductForCart | null>(null)
  const categories: ProductCategory[] = ['sweatshirts']
  const sweatshirts = ref<Product[]>([])
  const getActivePhotoUrl = (product: Product | ProductForCart) => {
    return product.photoUrls[product.colors[0]]
  }
  const fetchAll = async (): Promise<void> => {
    const fetchedSweatshirts = await fetchCollection<Product>('sweatshirts')
    if (fetchedSweatshirts) {
      for (const fetchedSweatshirt of fetchedSweatshirts) {
        const isSet = sweatshirts.value.find(sweatshirt => sweatshirt.id === fetchedSweatshirt.id)
        if (!isSet) {
          sweatshirts.value.push({ ...fetchedSweatshirt, category: 'sweatshirts' })
        }
      }
    }
  }
  const setActive = (product: ProductForCart): void => {
    active.value = { ...product }
  }
  const setColor = (color: Color, product: ProductForCart): void => {
    product.color = color
  }
  const setSize = (size: Size, product: ProductForCart): void => {
    product.size = size
  }
  return {
    active,
    categories,
    sweatshirts,
    getActivePhotoUrl,
    fetchAll,
    setActive,
    setColor,
    setSize
  }
})
