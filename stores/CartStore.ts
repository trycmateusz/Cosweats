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
      const isSetWithTheSameSizeAndColor = this.cart.find(productInCart =>
        product.id === productInCart.id &&
        product.size === productInCart.size &&
        product.color === productInCart.color
      )
      if (isSetWithTheSameSizeAndColor) {
        isSetWithTheSameSizeAndColor.quantity += product.quantity
      } else {
        this.cart.push(product)
      }
    },
    removeOne (product: ProductForCart) {
      const index = this.cart.findIndex(productToFind => productToFind.id === product.id)
      if (index !== -1) {
        this.cart.splice(index, 1)
      }
    }
  },
  getters: {
    getAllProductQuantities (state): number[] {
      return state.cart.map(product => product.quantity)
    },
    getLength (state): number {
      if (state.cart.length === 0) {
        return 0
      } else {
        return this.getAllProductQuantities.reduce((quantity, currentValue) => quantity + currentValue, 0)
      }
    },
    hasProducts (state) {
      return state.cart.length !== 0
    }
  }
})
