import { fetchCollection, fetchOnCondition } from '~/services/fetch'
import type { Product, ProductForCart } from '~/types/Product.js'
import type { Color } from 'types/Color'
import type { Size } from 'types/Size'

export const useProductStore = defineStore('ProductStore', () => {
  const active = ref<ProductForCart | null>(null)
  const products = ref<Product[]>([])
  const getPhotoUrl = (product: Product | ProductForCart) => {
    return product.photoUrls[product.colors[0]]
  }
  const fetchAll = async (): Promise<void> => {
    const fetchedProducts = await fetchCollection<Product>('products')
    if (fetchedProducts) {
      for (const fetchedProduct of fetchedProducts) {
        const isSet = products.value.find(sweatshirt => sweatshirt.id === fetchedProduct.id)
        if (!isSet) {
          products.value.push({ ...fetchedProduct })
        }
      }
    }
  }
  const fetchCategory = async (category: string): Promise<void> => {
    const fetchedProducts = await fetchOnCondition<Product>('products', 'category', category)
    if (fetchedProducts) {
      for (const fetchedProduct of fetchedProducts) {
        const isSet = products.value.find(sweatshirt => sweatshirt.id === fetchedProduct.id)
        if (!isSet) {
          products.value.push({ ...fetchedProduct })
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
  const getProductsFrom = computed(() => {
    return (category: string) => {
      return products.value.filter(product => product.category === category)
    }
  })
  return {
    active,
    products,
    getPhotoUrl,
    fetchAll,
    fetchCategory,
    setActive,
    setColor,
    setSize,
    getProductsFrom
  }
})
