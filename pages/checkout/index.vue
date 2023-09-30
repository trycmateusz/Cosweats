<template>
  <div>
    <TheNavigation class="border-b border-borderDarkColor" />
    <AppHeader text="Checkout" />
    <main class="flex flex-col gap-10 wrapper p-5 sm:p-8 sm:gap-16">
      <TheCartProductList
        class="grid grid-cols-1 gap-5 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        :checkout="true"
        :products="cartStore.cart"
      />
      <div class="grid grid-cols-1 gap-10 sm:gap-16 lg:grid-cols-2">
        <ProductListPriceTotal
          :price-to-show="subtotalWithCurrency"
          :shipping="false"
        />
        <form
          class="flex flex-col flex-grow gap-5 text-3xl sm:gap-8"
          @submit.prevent="fetchDiscount(discountCode)"
        >
          <div>
            <label for="discount">
              You found a discount code?<br>
              Paste it here!
            </label>
            <span class="inline-block text-grayDark text-2xl">
              Psst. Try <span class="italic">s3cretc0de.</span> I think the dev put this message here so you can use it freely...
            </span>
          </div>

          <div class="flex flex-col gap-5 sm:flex-row sm:gap-8">
            <input
              v-model="discountCode"
              type="text"
              class="flex-grow w-full rounded-full p-5 border border-borderDarkColor"
              name="discount"
            >
            <AppButton
              text="Apply"
              style-type="primary"
              class="ml-auto"
            />
          </div>
        </form>
      </div>
      <CheckoutForm />
      <div class="flex flex-col gap-5 sm:gap-8 sm:flex-row sm:items-center">
        <ProductListPriceTotal
          class="max-w-full sm:max-w-fit"
          :shipping="true"
          :price-to-show="totalWithCurrency"
        />
        <span class="text-3xl text-grayDark">
          {{ `${subtotalWithCurrency} worth of products ${discountText}` }}
        </span>
      </div>
      <div class="flex flex-col justify-end items-end gap-5 text-3xl md:flex-row sm:gap-8">
        <AppButton text="Checkout" style-type="primary" />
        <AppLink
          link="/shop"
          text="Continue shopping"
          style-type="secondary"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['cart-empty']
})
const discountCode = ref('')
const { discount, fetchDiscount } = useDiscount()
const cartStore = useCartStore()
const currencyStore = useCurrencyStore()
const subtotalWithCurrency = computed(() => {
  return `${currencyStore.getPriceToShow(cartStore.getSubtotalPrice())} ${currencyStore.current?.symbol}`
})
const totalWithCurrency = computed(() => {
  return `${currencyStore.getPriceToShow(cartStore.getTotalPrice())} ${currencyStore.current?.symbol}`
})
const discountText = computed(() => {
  if (discount.value) {
    return `with a ${discount.value.percentage}% discount`
  } else {
    return 'without discount'
  }
})
</script>

<style scoped>

</style>
