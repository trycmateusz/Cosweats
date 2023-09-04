import { fetchCollection } from '~/services/fetch'
import type { Product } from '~/types/Product.js'

type State = {
  products: {
    sweatshirts: Product[]
  }
}

export const useProductStore = defineStore('ProductStore', {
  state: (): State => {
    return {
      products: {
        sweatshirts: []
      }
    }
  },
  actions: {
    async fetchAll () {
      const sweatshirts = await fetchCollection<Product>('sweatshirts')
      if (sweatshirts) {
        sweatshirts.forEach((sweatshirtToSet) => {
          const isSet = this.products.sweatshirts.find(sweatshirt => sweatshirt.id === sweatshirtToSet.id)
          if (!isSet) {
            this.products.sweatshirts.push(sweatshirtToSet)
          }
        })
      }
    }
  }
})
