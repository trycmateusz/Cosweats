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
    }
  },
  getters: {
    allProductQuantities (state): number[] {
      return state.cart.map(product => product.quantity)
    },
    getLength (state): number {
      if (state.cart.length === 0) {
        return 0
      } else {
        return this.allProductQuantities.reduce((quantity, currentValue) => quantity + currentValue, 0)
      }
    }
  }
})
