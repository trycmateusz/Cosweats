import type { ProductForCart } from '~/types/Product'

type State = {
  cart: ProductForCart[]
}

export const useCartStore = defineStore('CartStore', {
  state: (): State => {
    return {
      cart: []
    }
  },
  actions: {
    addOne (product: ProductForCart) {
      this.cart.push(product)
    },
    removeOne (product: ProductForCart) {
      const index = this.cart.findIndex(productToFind => productToFind.id === product.id)
      if (index !== -1) {
        this.cart.splice(index, 1)
      }
    }
  },
  getters: {
    getLength (state): number {
      if (state.cart.length === 0) {
        return 0
      } else {
        return state.cart.length
      }
    },
    hasProducts (state) {
      return state.cart.length !== 0
    }
  }
})
