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
  const getLength = computed((): number => {
    return cart.value.length
  })
  const hasProducts = computed((): boolean => {
    return getLength.value !== 0
  })
  const getPrices = computed((): number[] => {
    return cart.value.map(product => product.priceInCents)
  })
  const getSubtotalPrice = computed((): number => {
    return getPrices.value.reduce((price, currentValue) => price + currentValue, 0)
  })
  const getTotalPrice = computed((): number => {
    if (discount.value) {
      return getSubtotalPrice.value * discount.value.multiplier
    } else {
      return getSubtotalPrice.value
    }
  })
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
