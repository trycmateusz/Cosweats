<template>
  <nav class="flex w-full justify-end border-t-[1px] border-b-[1px] border-borderDarkColor">
    <div
      v-for="(dropdown, index) in dropdowns"
      :key="dropdown.id"
      :class="{ 'mr-auto': index === 0 }"
    >
      <AppDropdown
        :has-icon="true"
        :expanded="dropdown.expanded"
        :text="dropdown.text"
        :light="true"
        :menu-item-classes="dropdown.classes"
        @expand="() => closeAllButOneDropdown(dropdown.id)"
      />
    </div>
    <button
      class="relative flex items-center gap-2 px-8 py-5"
    >
      <span
        class="hidden sm:inline-block pr-4"
      >
        Cart
      </span>
      <ClientOnly>
        <div class="icons relative">
          <img src="~/assets/img/cart.svg" class="max-w-[2.5rem] max-h-[2.25rem] sm:hidden" alt="">
          <span class="block absolute right-0 bottom-[20%] px-[0.4rem] leading-none rounded-full bg-blackishMain border border-whiteishMain translate-x-1/2 translate-y-1/2">0</span>
        </div>
      </ClientOnly>
    </button>
  </nav>
</template>

<script setup lang="ts">
import type Dropdown from '~/types/Dropdown.js'
const dropdowns: Dropdown[] = reactive([
  {
    id: Math.random(),
    text: 'Products',
    expanded: false,
    classes: ['left-0', 'border-r']
  },
  {
    id: Math.random(),
    text: 'Currency',
    expanded: false,
    classes: ['right-0', 'border-l', 'border-r']
  }
])
const closeAll = (dropdowns: Dropdown[]) => {
  dropdowns.forEach((dropdown) => {
    if (dropdown.expanded) {
      dropdown.expanded = false
    }
  })
}
const closeAllButOneDropdown = (id: number) => {
  const toClose = dropdowns.filter(dropdown => dropdown.id !== id)
  const toOpen = dropdowns.find(dropdown => dropdown.id === id)
  closeAll(toClose)
  if (toOpen) {
    toOpen.expanded = !toOpen.expanded
  }
}
</script>

<style scoped>

</style>
