<template>
  <div id="content">
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
          @submit.prevent="checkIfEmptyAndFetchDiscount"
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

          <div class="relative flex flex-col gap-5 sm:flex-row sm:gap-8">
            <span v-if="errorMessage" ref="discountError" class="absolute -top-2 left-5 p-5 bg-red-900 text-white rounded-full text-center -translate-y-full hide-slowly sm:p-8 sm:-top-4 sm:left-8">
              {{ errorMessage }}
            </span>
            <input
              v-model="discountCode"
              type="text"
              class="flex-grow w-full rounded-full p-5 border border-borderDarkColor"
              name="discount"
            >
            <AppButton
              aria-controls="discountApplied"
              text="Apply"
              style-type="primary"
              class="ml-auto"
            />
          </div>
        </form>
      </div>
      <CheckoutForm @success="submitSuccessPopupOpen = true" />
      <div class="flex flex-col gap-5 sm:gap-8 sm:flex-row sm:items-center">
        <ProductListPriceTotal
          class="max-w-full sm:max-w-fit"
          :shipping="true"
          :price-to-show="totalWithCurrency"
        />
        <span class="text-3xl text-grayDark">
          {{ `${subtotalWithCurrency} worth of products ${discountText} and ${shipmentText}` }}
        </span>
      </div>
      <div class="flex flex-col justify-end items-end gap-5 mb-5 text-3xl md:flex-row sm:gap-8 sm:mb-8">
        <AppButton form="checkoutForm" text="Checkout" style-type="primary" />
        <AppLink
          link="/shop"
          text="Continue shopping"
          style-type="secondary"
        />
      </div>
    </main>
    <TheFooter />
    <ClientOnly>
      <CheckoutPopup
        v-if="discountAppliedPopupOpen"
        title="Discount code applied!"
        button-text="Okay"
        @close="closeDiscountOverlay"
      />
      <CheckoutPopup
        v-if="submitSuccessPopupOpen"
        title="Transaction completed successfully!"
        button-text="Thanks!"
        @close="navigateToShopAfterFormSuccess"
      >
        <template #message>
          Thank you for shopping at Cosweats! I hope you will visit us again soon. : )
        </template>
      </CheckoutPopup>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ['cart-empty']
})
const cartStore = useCartStore()
const currencyStore = useCurrencyStore()
const { makeBodyFixed, removeFixedFromBody } = useFixedBody()
const { discount, fetchDiscount, errorMessage, setErrorMessageToNull } = useDiscount()
const router = useRouter()
const discountCode = ref('')
const discountError = ref<HTMLElement | undefined>(undefined)
const discountAppliedPopupOpen = ref(false)
const submitSuccessPopupOpen = ref(false)
const subtotalWithCurrency = computed(() => {
  return `${currencyStore.formatPriceToShow(cartStore.getSubtotalPrice)} ${currencyStore.current?.symbol}`
})
const totalWithCurrency = computed(() => {
  return `${currencyStore.formatPriceToShow(cartStore.getTotalPrice)} ${currencyStore.current?.symbol}`
})
const discountText = computed(() => {
  if (discount.value) {
    return `with a ${discount.value.percentage}% discount`
  } else {
    return 'without discount'
  }
})
const shipmentText = computed(() => {
  return 'excluding shipment'
})
const closeDiscountOverlay = () => {
  removeFixedFromBody()
  discountAppliedPopupOpen.value = false
}
const checkIfEmptyAndFetchDiscount = () => {
  setErrorMessageToNull()
  if (discountCode.value.length > 0) {
    fetchDiscount(discountCode.value)
  }
}
const navigateToShopAfterFormSuccess = () => {
  submitSuccessPopupOpen.value = false
  removeFixedFromBody()
  router.push('/shop')
}
watch(discount, () => {
  if (discount.value) {
    discountAppliedPopupOpen.value = true
    makeBodyFixed()
  }
})
watch(submitSuccessPopupOpen, () => {
  if (submitSuccessPopupOpen.value) {
    makeBodyFixed()
  }
})
watch(errorMessage, async () => {
  if (discountError.value && errorMessage.value) {
    discountError.value.classList.remove('hide-slowly')
    await nextTick()
    discountError.value.classList.add('hide-slowly')
  }
})
</script>

<style scoped>
.hide-slowly {
  animation: hideSlowly 3s forwards ease-in-out;
}

@keyframes hideSlowly {
  0% {
    opacity: 0;
    pointer-events: all;
  }
  5% {
    opacity: 1;
    pointer-events: all;
  }
  60% {
    opacity: 1;
    pointer-events: all;
  }
  99% {
    opacity: 0;
    pointer-events: all;
  }
  100% {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
