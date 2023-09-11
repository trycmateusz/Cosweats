<template>
  <div class="flex flex-col gap-10 p-5 bg-whiteishDarker text-2xl sm:p-8 sm:gap-8 md:h-full">
    <button
      :label="`Photo which opens ${product.name} product info overlay`"
      :aria-controls="overlayAriaControlsId"
      @click="isOverlayActive = true"
    >
      <img
        :src="imageSrc"
        :alt="imageAlt"
        class="p-5 w-full bg-white sm:p-8 pointer-events-none"
      >
    </button>
    <ProductListItemInfo :product="product" />
    <AppButton
      class="mt-auto ml-auto text-3xl"
      style-type="primary"
      text="Take a look"
      :aria-label="`Open ${product.name} product info overlay`"
      :aria-controls="overlayAriaControlsId"
      @click="isOverlayActive = true"
    />
    <Teleport to="body">
      <ProductListItemOverlay
        v-if="isOverlayActive"
        :overlay-id="overlayAriaControlsId"
        :product="product"
        @close="isOverlayActive = false"
        @add-active="addActiveProductToCart"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product'
import { useCartStore } from '~/stores/CartStore'
const cartStore = useCartStore()
const props = defineProps<{
  product: Product
}>()
const imageAlt = ref(`${props.product.name} in ${props.product.colors[0]}`)
const isOverlayActive = ref(false)
const imageSrc = computed(() => {
  return props.product.photoUrls[props.product.colors[0]]
})
const overlayAriaControlsId = computed(() => {
  return `${props.product.nameKebab}-overlay`
})
const addActiveProductToCart = (): void => {

}
</script>

<style lang="scss" scoped>
</style>
