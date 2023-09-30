<template>
  <div class="flex flex-col gap-10 p-5 bg-whiteishDarker text-2xl sm:p-8 sm:gap-8 md:h-full">
    <button
      :label="`Photo which opens ${product.name} product info overlay`"
      :aria-controls="overlayAriaControlsId"
      class="focus:-outline-offset-4"
      @click="isOverlayActive = true"
    >
      <img
        :src="productStore.getActivePhotoUrl(product)"
        :alt="imageAlt"
        class="p-5 w-full bg-white sm:p-8 pointer-events-none aspect-square"
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
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/Product'
const productStore = useProductStore()
const props = defineProps<{
  product: Product
}>()
const imageAlt = ref(`${props.product.name} in ${props.product.colors[0]}`)
const isOverlayActive = ref(false)
const overlayAriaControlsId = computed(() => {
  return `${props.product.nameKebab}-overlay`
})
</script>

<style lang="scss" scoped>
</style>
