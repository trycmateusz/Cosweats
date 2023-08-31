import type { Product } from '~/types/Product.js'

type State = {
  products: Product[]
}

export const useProductStore = defineStore('ProductStore', {
  state: (): State => {
    return {
      products: []
    }
  },
  actions: {

  }
})
