import type { ProductForCart } from '~/types/Product'
import { useDiscount } from '~/composables/useDiscount'

export const useCartStore = defineStore('CartStore', () => {
  const { discount } = useDiscount()
  const cart = ref<ProductForCart[]>([])
  const isCartOpen = ref(false)
  const shippingPriceInCents = ref(0)
  const addOne = (product: ProductForCart) => {
    cart.value.push(product)
  }
  const openCart = () => {
    isCartOpen.value = true
  }
  const closeCart = () => {
    isCartOpen.value = false
  }
  const removeOne = (product: ProductForCart) => {
    const index = cart.value.findIndex(productToFind => productToFind.id === product.id)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }
  const setShipping = (price: number) => {
    shippingPriceInCents.value = price
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
      return (getSubtotalPrice.value + shippingPriceInCents.value) * discount.value.multiplier
    } else {
      return (getSubtotalPrice.value + shippingPriceInCents.value)
    }
  })
  return {
    cart,
    isCartOpen,
    shippingPriceInCents,
    addOne,
    removeOne,
    openCart,
    closeCart,
    setShipping,
    getLength,
    hasProducts,
    getSubtotalPrice,
    getTotalPrice
  }
})
