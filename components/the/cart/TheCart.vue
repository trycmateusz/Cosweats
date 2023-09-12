<template>
  <div class="fixed top-0 right-0 w-full h-full z-60">
    <ClientOnly>
      <div class="hidden absolute w-full h-full bg-black opacity-90 sm:block" />
      <div
        id="cart"
        v-click-outside="{ close: () => emit('close'), checkAriaControls: true }"
        class="cart wrapper bg-whiteishMain w-full h-full overflow-y-scroll sm:p-8"
      >
        <AppCloseBar parent-label="Button to close Cart" @close="emit('close')" />
        <div class="p-5 sm:p-8">
          <div class="flex gap-4 mb-10">
            <span class="text-7xl md:text-9xl">Cart</span>
            <img src="~/assets/img/cart_dark.svg" alt="">
          </div>
          <TheCartProductList :products="cartStore.cart" />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/CartStore'
const cartStore = useCartStore()
const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>

</style>
