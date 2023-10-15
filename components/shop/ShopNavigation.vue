<template>
  <nav class="border-t-[1px] border-b-[1px] border-borderDarkColor">
    <div class="wrapper flex w-full justify-end ">
      <div
        v-for="(dropdown, dropdownIndex) in dropdowns"
        :key="dropdown.id"
        :class="{ 'mr-auto': dropdownIndex === 0 }"
      >
        <AppDropdown
          v-click-outside="{ 'close': () => dropdown.expanded = false }"
          :menu-max-height-in-viewport-percent="0.25"
          :has-icon="true"
          :light="true"
          :dropdown="dropdown"
          @toggle="() => closeAllButOne(dropdown.id)"
          @close="closeOne(dropdown)"
        >
          <template v-if="dropdown.role === 'currency' && currentCurrency" #currency-dropdown>
            <span class="inline-block mr-1 leading-none sm:hidden">
              {{ `[${currentCurrency.symbol}] ` }}
            </span>
          </template>
          <template #options>
            <div v-if="dropdown.links" class="flex flex-col">
              <AppDropdownLink
                v-for="(link, linkIndex) in dropdown.links"
                :key="linkIndex"
                :aria-hidden="!dropdown.expanded"
                :tabindex="dropdown.expanded ? 0 : -1"
                :text="link.text"
                :to="link.to"
              />
            </div>
            <ClientOnly v-if="dropdown.role === 'currency'">
              <div class="flex flex-col max-w-[60svw]">
                <div
                  v-for="currency in currencyStore.currencies"
                  :key="currency.code"
                  class="flex border-b border-borderDarkColor first:border-t"
                >
                  <button
                    class="flex-grow px-8 py-5 w-max max-w-full focus:-outline-offset-4"
                    :aria-hidden="!dropdown.expanded"
                    :tabindex="dropdown.expanded ? 0 : -1"
                    @click="chooseCurrency(currency)"
                  >
                    {{ `${currency.name} (${currency.symbol})` }}
                  </button>
                </div>
              </div>
            </ClientOnly>
          </template>
        </AppDropdown>
      </div>
      <button
        class="relative flex items-center gap-2 px-8 py-5"
        aria-controls="cart"
        :aria-expanded="cartStore.isCartOpen"
        @click="cartStore.openCart()"
      >
        <span
          class="hidden sm:inline-block pr-4 pointer-events-none sm:pr-0"
        >
          Cart
        </span>
        <ClientOnly>
          <div class="icons relative pointer-events-none">
            <img src="~/assets/img/cart.svg" class="max-w-[2.5rem] max-h-[2.25rem] sm:hidden" alt="">
            <span class="flex items-center justify-center absolute right-0 bottom-[20%] min-w-[1.2em] px-[0.4rem] leading-none rounded-full bg-blackishMain border border-whiteishMain translate-x-1/2 translate-y-1/2 aspect-square sm:static sm:translate-x-0 sm:translate-y-0">
              {{ cartStore.getLength }}
            </span>
          </div>
        </ClientOnly>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { convertToTitleCaseFromCamelCase } from '~/helpers'
import type { Dropdown } from '~/types/Dropdown'
import type { Currency } from '~/types/Currency'
const currencyStore = useCurrencyStore()
const cartStore = useCartStore()
const productStore = useProductStore()
const { current: currentCurrency } = storeToRefs(currencyStore)
await productStore.fetchPossibleCategories()
const dropdowns = ref<Dropdown[]>([
  {
    id: Math.random(),
    text: 'Products',
    role: 'products',
    expanded: false,
    classes: ['left-0', 'border-r', '2xl:border-l', 'absolute', 'menu-translate', 'top-0'],
    links: productStore.categories.map((category) => {
      return {
        text: convertToTitleCaseFromCamelCase(category),
        to: `/shop/${category}`
      }
    })
  },
  {
    id: Math.random(),
    text: 'Currency',
    role: 'currency',
    expanded: false,
    classes: ['right-0', 'border-l', 'border-r', 'absolute', 'menu-translate', 'top-0']
  }
])
const closeOne = (dropdown: Dropdown): void => {
  dropdown.expanded = false
}
const closeAll = (dropdowns: Dropdown[]): void => {
  dropdowns.forEach((dropdown) => {
    closeOne(dropdown)
  })
}
const closeAllButOne = (dropdownId: number): void => {
  const toClose = dropdowns.value.filter(dropdown => dropdown.id !== dropdownId)
  const toOpen = dropdowns.value.find(dropdown => dropdown.id === dropdownId)
  closeAll(toClose)
  if (toOpen) {
    toOpen.expanded = !toOpen.expanded
  }
}
const chooseCurrency = (currency: Currency): void => {
  currencyStore.setCurrent(currency.code)
  closeAll(dropdowns.value)
}
watch(currentCurrency, (): void => {
  const currencyDropdown = dropdowns.value.find(dropdown => dropdown.role === 'currency')
  if (currencyDropdown) {
    if (currentCurrency.value) {
      currencyDropdown.text = `Currency [${currentCurrency.value.symbol}]`
    } else {
      currencyDropdown.text = 'Currency'
    }
  }
}, {
  immediate: true
})
</script>

<style>
.menu-translate {
  transform: translateY(Calc(var(--nav-height) + 1px))
}
</style>
