import { fetchCollection } from '~/services/fetch'
import type { Product, ProductForCart, ProductCategory } from '~/types/Product.js'
import type { Color } from 'types/Color'
import type { Size } from 'types/Size'

type State = {
  sweatshirts: Product[]
  categories: ProductCategory[]
  active: ProductForCart | null
  maxQuantity: number
  minQuantity: number
}

export const useProductStore = defineStore('ProductStore', {
  state: (): State => {
    return {
      sweatshirts: [],
      categories: [
        'sweatshirts'
      ],
      active: null,
      maxQuantity: 10,
      minQuantity: 1
    }
  },
  getters: {

  },
  actions: {
    async fetchAll (): Promise<void> {
      const sweatshirts = await fetchCollection<Product>('sweatshirts')
      if (sweatshirts) {
        for (const sweatshirtToSet of sweatshirts) {
          const isSet = this.sweatshirts.find(sweatshirt => sweatshirt.id === sweatshirtToSet.id)
          if (!isSet) {
            this.sweatshirts.push({ ...sweatshirtToSet, category: 'sweatshirts' })
          }
        }
      }
    },
    setActive (product: ProductForCart) {
      this.active = { ...product }
    },
    setActiveColor (color: Color): void {
      if (this.active) {
        this.active.color = color
      }
    },
    setActiveSize (size: Size): void {
      if (this.active) {
        this.active.size = size
      }
    },
    changeActiveQuantityBy (amount: -1 | 1) {
      if (this.active) {
        if (this.active.quantity + amount >= this.minQuantity && this.active.quantity + amount <= this.maxQuantity) {
          this.active.quantity += amount
        }
      }
    }
  }
})
