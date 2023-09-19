<template>
  <div
    id="cart"
    class="fixed top-0 right-0 w-full h-full z-60 overflow-y-auto bg-whiteishMain md:max-w-[50%]"
  >
    <ClientOnly>
      <div class="shadow hidden fixed top-0 right-1/2 w-full h-full bg-black opacity-90 z-50 md:block" @click="emit('close')" />
      <div
        class="cart max-w-[700px] mr-0 right relative w-full z-60"
      >
        <AppCloseBar parent-label="Button to close Cart" @close="emit('close')" />
        <div class="p-5 sm:p-8">
          <div class="flex gap-4 mb-16">
            <span class="text-7xl">Cart</span>
            <img src="~/assets/img/cart_dark.svg" alt="">
          </div>
          <TheCartProductList
            v-if="cartStore.hasProducts"
            :products="cartStore.cart"
          />
          <div v-else class="flex flex-col gap-5 text-2xl sm:gap-8">
            <p>
              It seems like you haven't added any items. Please, take a look around!
            </p>
            <AppButton text="Continue shopping" style-type="primary" @click="emit('close')" />
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
const { makeBodyFixed, removeFixedFromBody } = useFixedBody()
const emit = defineEmits<{
  (e: 'close'): void
}>()
onMounted(() => {
  makeBodyFixed()
})
onUnmounted(() => {
  removeFixedFromBody()
})
</script>

<style scoped>

</style>
