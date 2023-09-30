<template>
  <div class="relative p-5 bg-whiteishDarker min-w-max overflow-hidden sm:p-8">
    <img class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[60deg] h-[200%] opacity-40 z-10" src="~/assets/img/dollar.svg" alt="">
    <div class="flex gap-10 relative h-full z-20 font-bold sm:gap-16">
      <div class="flex flex-col justify-center gap-2 sm:gap-5">
        <span class="text-4xl">
          {{ showTotalOrSubtotal }}
        </span>
        <span
          v-if="!shipping"
          class="text-grayDark text-2xl"
        >
          Price excludes shipping
        </span>
      </div>
      <span class="flex-grow text-4xl text-right h-max mt-auto mb-auto">
        {{ priceToShow }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  priceToShow: string
  shipping: boolean
}>()
const showTotalOrSubtotal = computed(() => {
  if (props.shipping) {
    return 'Total'
  } else {
    return 'Subtotal'
  }
})
</script>

<style scoped>

</style>
