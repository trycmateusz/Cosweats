<template>
  <div
    class="flex flex-col gap-10 p-5 bg-whiteishDarker text-xl sm:p-8 sm:gap-8 md:h-full"
    tabindex="-1"
    @click="isOverlayActive = true"
  >
    <button
      :aria-controls="overlayAriaControlsId"
      :aria-expanded="isOverlayActive"
      class="focus:-outline-offset-4"
      @click="isOverlayActive = true"
    >
      <img
        :src="productStore.getPhotoUrl(product)"
        :alt="imageAlt"
        class="p-5 w-full bg-white sm:p-8 pointer-events-none aspect-square"
      >
    </button>
    <ProductListItemInfo :product="product" />
    <AppButton
      class="mt-auto ml-auto text-2xl"
      style-type="primary"
      text="Take a look"
      :aria-controls="overlayAriaControlsId"
      :aria-expanded="isOverlayActive"
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
const route = useRoute()
const imageAlt = ref(`${props.product.name} in ${props.product.colors[0]}`)
const queryItemId = computed(() => {
  return route.query.itemId
})
const isOverlayActive = ref(queryItemId ? props.product.id === queryItemId.value : false)
const overlayAriaControlsId = computed(() => {
  return `${props.product.nameKebab}-overlay`
})
watch(queryItemId, () => {
  if (!queryItemId.value) {
    isOverlayActive.value = false
  }
})
</script>

<style lang="scss" scoped>
</style>
