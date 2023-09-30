import type { ProductForCart } from '~/types/Product'
import { useDiscount } from '~/composables/useDiscount'

export const useCartStore = defineStore('CartStore', () => {
  const { discount } = useDiscount()
  const cart = ref<ProductForCart[]>([])
  const addOne = (product: ProductForCart) => {
    cart.value.push(product)
  }
  const removeOne = (product: ProductForCart) => {
    const index = cart.value.findIndex(productToFind => productToFind.id === product.id)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }
  const getLength = (): number => {
    if (cart.value.length === 0) {
      return 0
    } else {
      return cart.value.length
    }
  }
  const hasProducts = (): boolean => {
    return cart.value.length !== 0
  }
  const getSubtotalPrice = (): number => {
    const prices = cart.value.map(product => product.priceInCents)
    const sum = prices.reduce((price, currentValue) => price + currentValue, 0)
    return sum
  }
  const getTotalPrice = (): number => {
    if (discount.value) {
      return getSubtotalPrice() * discount.value.multiplier
    } else {
      return getSubtotalPrice()
    }
  }
  return {
    cart,
    addOne,
    removeOne,
    getLength,
    hasProducts,
    getSubtotalPrice,
    getTotalPrice
  }
})
