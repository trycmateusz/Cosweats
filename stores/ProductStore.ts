import { fetchCollection } from '~/services/fetch'
import type { Product } from '~/types/Product.js'

type State = {
  categories: {
    sweatshirts: Product[]
  }
}

export const useProductStore = defineStore('ProductStore', {
  state: (): State => {
    return {
      categories: {
        sweatshirts: []
      }
    }
  },
  actions: {
    async fetchAll () {
      const sweatshirts = await fetchCollection<Product>('sweatshirts')
      if (sweatshirts) {
        sweatshirts.forEach((sweatshirtToSet) => {
          const isSet = this.categories.sweatshirts.find(sweatshirt => sweatshirt.id === sweatshirtToSet.id)
          if (!isSet) {
            this.categories.sweatshirts.push(sweatshirtToSet)
          }
        })
      }
    }
  }
})
