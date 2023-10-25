<template>
  <div>
    <TheNavigation>
      <ShopNavigation />
    </TheNavigation>
    <AppHeader :text="headerText" />
    <main class="wrapper flex flex-col border-whiteishDarker md:flex-row 2xl:border-l">
      <ProductListFilters
        :filter-conditions="filterConditions"
        class="md:w-1/2 min-h-max"
        @add-color-filter="(color: Color) => filterConditions.colors.push(color)"
        @add-size-filter="(size) => filterConditions.sizes.push(size)"
        @remove-color-filter="(index) => filterConditions.colors.splice(index, 1)"
        @remove-size-filter="(index) => filterConditions.sizes.splice(index, 1)"
        @apply-filters="productStore.setFilters(filterConditions)"
        @reset-filters="resetFilters"
      />
      <div class="grid grid-cols-1 md:w-full h-max md:border-l md:border-whiteishDarker">
        <transition>
          <div v-if="productStore.areAnyFilters" class="flex flex-wrap bg-whiteishMain gap-5 p-5 pb-0 h-max text-xl sm:p-8 sm:pb-0">
            <AppButton
              v-for="(color, index) in productStore.appliedFilters?.colors"
              :key="color"
              style-type="tertiary"
              :text="color"
              class="filter-button flex items-center gap-2 h-max"
              @click="removeFilter(color, index)"
            >
              <template #default>
                <img class="w-8" src="~/assets/img/x-circle.svg" alt="">
              </template>
            </AppButton>
            <AppButton
              v-for="(size, index) in productStore.appliedFilters?.sizes"
              :key="size"
              style-type="tertiary"
              :text="size"
              class="filter-button flex items-center gap-2 h-max"
              @click="removeFilter(size, index)"
            >
              <template #default>
                <img class="w-8" src="~/assets/img/x-circle.svg" alt="">
              </template>
            </AppButton>
          </div>
        </transition>

        <ProductList
          class="w-full"
          :products="products"
        />
      </div>
    </main>
    <TheFooter />
    <teleport to="body">
      <TheCart
        v-if="cartStore.isCartOpen"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import type { ProductFilterConditions, Product } from '~/types/Product'
import type { Color } from '~/types/Color'
import type { Size } from '~/types/Size'
import { isColor } from '~/types/Color'
import { isSize } from '~/types/Size'
defineProps<{
  products: Product[]
  headerText: string
}>()
const productStore = useProductStore()
const cartStore = useCartStore()
const filterConditions = ref<ProductFilterConditions>({
  colors: [],
  sizes: []
})
const removeFilter = (condition: Color | Size, index: number) => {
  if (isColor(condition)) {
    filterConditions.value.colors.splice(index, 1)
  }
  if (isSize(condition)) {
    filterConditions.value.sizes.splice(index, 1)
  }
  productStore.removeFilter(condition)
}
const resetFilters = () => {
  filterConditions.value.colors = []
  filterConditions.value.sizes = []
  productStore.setFilters(null)
}
</script>

<style scoped>
.filter-button {
  padding-left: 0.7em !important;
  padding-right: 0.7em !important;
}
</style>
