<template>
  <div class="filters-box flex flex-col items-end sticky top-[var(--shop-nav-height)] border-b bg-whiteishMain h-max border-whiteishDarker overflow-hidden">
    <button
      class="p-5 md:hidden min-h-[var(--nav-height)]"
      aria-controls="filters"
      :aria-expanded="areFiltersOpen"
      :aria-hidden="isDesktop"
      @click="areFiltersOpen = !areFiltersOpen"
    >
      <img class="w-10" src="~/assets/img/filter.svg" alt="Toggler for filters">
    </button>
    <div class="flex flex-col w-full items-end max-h-[Calc(100svh_-_var(--shop-nav-and-filter-height))] overflow-auto md:max-h-[Calc(100svh_-_var(--shop-nav-height))]">
      <div
        id="filters"
        class="text-xl border-t min-w-full max-h-0 transition-max-height overflow-y-auto duration-300 md:filters-open"
        :class="{ 'filters-open': areFiltersOpen, 'border-whiteishDarker': areFiltersOpen }"
        :aria-hidden="!areFiltersOpen"
      >
        <div>
          <AppDropdown
            v-for="filter in filters"
            :key="filter.id"
            :dropdown="filter"
            :button-tabindex="areFiltersOpen ? '0' : '-1'"
            :menu-max-height-in-viewport-percent="0.30"
            class="w-full border-b border-whiteishDarker last:border-whiteishMain"
            @toggle="() => closeAllButOne(filter.id)"
          >
            <template #options>
              <div
                v-if="filter.role === 'sizes'"
                :class="{ 'filter-expanded': areFiltersOpen }"
                class="max-h-0 transition-max-height duration-300 ease-linear"
              >
                <ProductListFiltersSize
                  v-for="size in productStore.getPossibleSizes"
                  :key="size"
                  :size="size"
                  :filter-expanded="filter.expanded"
                  :is-checked="filterConditions.sizes.includes(size)"
                  @toggle-filter="(size) => toggleFilter(size)"
                />
              </div>
              <div
                v-if="filter.role === 'colors'"
                :class="{ 'filter-expanded': areFiltersOpen }"
                class="max-h-0 transition-max-height duration-300 ease-linear"
              >
                <ProductListFiltersColor
                  v-for="color in productStore.getPossibleColors"
                  :key="color"
                  :color="color"
                  :filter-expanded="filter.expanded"
                  :is-checked="filterConditions.colors.includes(color)"
                  @toggle-filter="(color) => toggleFilter(color)"
                />
              </div>
              <div
                v-if="filter.role === 'sort'"
                :class="{ 'filter-expanded': areFiltersOpen }"
                class="max-h-0 transition-max-height duration-300 ease-linear"
              >
                <ProductListFiltersSort
                  v-for="option in allSortsWithText"
                  :key="option.sort"
                  :sort="option.sort"
                  :filter-expanded="filter.expanded"
                  :text="option.text"
                  :is-checked="currentSort === option.sort"
                  @change-sort="(sort) => toggleOrSetSort(sort)"
                />
              </div>
            </template>
          </AppDropdown>
        </div>
        <div class="flex flex-wrap justify-end gap-5 border-t border-whiteishDarker p-5 sm:p-8">
          <AppButton
            class="text-xl"
            text="Reset"
            style-type="secondary"
            :tabindex="areFiltersOpen ? '0' : '-1'"
            @click="closeAndReset"
          />
          <AppButton
            class="text-xl"
            text="Apply"
            style-type="primary"
            :tabindex="areFiltersOpen ? '0' : '-1'"
            @click="closeAndApply"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Dropdown } from '~/types/Dropdown'
import type { Size } from '~/types/Size'
import type { Color } from '~/types/Color'
import type { ProductSort, ProductSortWithText, ProductFilterConditions } from '~/types/Product'
import { isColor } from '~/types/Color'
import { isSize } from '~/types/Size'
const props = defineProps<{
  filterConditions: ProductFilterConditions
}>()
const emit = defineEmits<{
  (e: 'remove-color-filter', index: number): void
  (e: 'add-color-filter', color: Color): void
  (e: 'remove-size-filter', index: number): void
  (e: 'add-size-filter', size: Size): void
  (e: 'apply-filters'): void
  (e: 'reset-filters'): void
}>()
const productStore = useProductStore()
const areFiltersOpen = ref(false)
const isDesktop = ref(false)
const filters = reactive<Dropdown[]>([
  {
    text: 'Colors',
    role: 'colors',
    expanded: false,
    id: Math.random(),
    classes: []
  },
  {
    text: 'Sizes',
    role: 'sizes',
    expanded: false,
    id: Math.random(),
    classes: []
  },
  {
    text: 'Sort',
    role: 'sort',
    expanded: false,
    id: Math.random(),
    classes: []
  }
])
const allSortsWithText: ProductSortWithText[] = [
  {
    sort: 'alphabetically-a-z',
    text: 'Alphabetically (A-Z)'
  },
  {
    sort: 'alphabetically-z-a',
    text: 'Alphabetically (Z-A)'
  },
  {
    sort: 'price-descending',
    text: 'Price Descending'
  },
  {
    sort: 'price-ascending',
    text: 'Price Ascending'
  }
]
const currentSort = ref<ProductSort | null>(null)
const closeAll = (filters: Dropdown[]) => {
  filters.forEach((filter) => {
    filter.expanded = false
  })
}
const closeAllButOne = (filterId: number) => {
  const toClose = filters.filter(filter => filter.id !== filterId)
  const toOpen = filters.find(filter => filter.id === filterId)
  closeAll(toClose)
  if (toOpen) {
    toOpen.expanded = !toOpen.expanded
  }
}
const toggleFilter = (condition: Color | Size) => {
  if (isColor(condition)) {
    const isSetIndex = props.filterConditions.colors.findIndex(color => color === condition)
    if (isSetIndex === -1) {
      emit('add-color-filter', condition)
    } else {
      emit('remove-color-filter', isSetIndex)
    }
  }
  if (isSize(condition)) {
    const isSetIndex = props.filterConditions.sizes.findIndex(size => size === condition)
    if (isSetIndex === -1) {
      emit('add-size-filter', condition)
    } else {
      emit('remove-size-filter', isSetIndex)
    }
  }
}
const toggleOrSetSort = (sort: ProductSort | null) => {
  if (!currentSort.value || currentSort.value !== sort) {
    currentSort.value = sort
  } else {
    currentSort.value = null
  }
}
const closeAndApply = () => {
  closeAll(filters)
  if (!isDesktop.value) {
    areFiltersOpen.value = false
  }
  emit('apply-filters')
  productStore.setSort(currentSort.value)
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}
const closeAndReset = () => {
  closeAll(filters)
  if (!isDesktop.value) {
    areFiltersOpen.value = false
  }
  emit('reset-filters')
  productStore.setFilters(null)
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}
watch(isDesktop, () => {
  if (isDesktop.value) {
    areFiltersOpen.value = true
  }
})
watch(areFiltersOpen, () => {
  if (!areFiltersOpen) {
    closeAll(filters)
  }
})
onMounted(() => {
  if (document.body.clientWidth >= 768) {
    isDesktop.value = true
  }
  window.addEventListener('resize', () => {
    if (document.body.clientWidth >= 768) {
      isDesktop.value = true
    } else {
      isDesktop.value = false
    }
  })
})
</script>

<style lang="scss" scoped>
.filters-open {
  max-height: 100svh
}
.filter-expanded {
  max-height: 50%;
}
.filters-box {
  ::-webkit-scrollbar-thumb:vertical {
    border: 1px solid $darker-blackish;
  }
}
</style>
