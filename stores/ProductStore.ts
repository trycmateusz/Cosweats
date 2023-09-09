import { fetchCollection } from '~/services/fetch'
import type { Product, ProductActive } from '~/types/Product.js'
import type { Color } from 'types/Color'
import type { Size } from 'types/Size'
import type { Category } from '~/types/Category'

type State = {
  sweatshirts: Product[]
  categories: Category[]
  active: ProductActive | null
}

export const useProductStore = defineStore('ProductStore', {
  state: (): State => {
    return {
      sweatshirts: [],
      categories: [
        'sweatshirts'
      ],
      active: null
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
    setActive (product: ProductActive) {
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
        if (this.active.quantity + amount !== 0) {
          this.active.quantity += amount
        }
      }
    }
  }
})
