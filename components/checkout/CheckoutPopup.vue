<template>
  <div
    class="fixed top-0 left-0 w-full h-full z-50"
  >
    <div
      class="absolute w-full h-full bg-black opacity-90"
      @click="emit('close')"
    />
    <div
      id="discountApplied"
      class="flex flex-col relative top-0 left-0 w-full h-full bg-whiteishMain z-60 overflow-hidden md:left-1/2 md:top-1/2 md:h-min md:max-w-3xl md:-translate-x-1/2 md:-translate-y-1/2"
    >
      <AppCloseBar
        class="bg-whiteishMain z-20 overflow-hidden"
        button-label="Button to close overlay indicating that the discount has been set."
        @close="emit('close')"
      />
      <img class="absolute left-0 top-1/2 -translate-x-1/4 -translate-y-1/2 md:top-auto md:bottom-0 md:w-1/2 md:translate-y-1/4 md:-translate-x-20" src="~/assets/img/checkmark.svg" alt="">
      <div class="relative flex-grow flex flex-col items-center justify-center gap-5 p-5 text-3xl z-10 sm:p-8 sm:gap-8">
        <div class="flex flex-col gap-2 text-center sm:gap-4">
          <span>
            {{ title }}
          </span>
          <span class="text-2xl">
            <slot name="message" />
          </span>
        </div>
        <AppButton
          style-type="primary"
          :text="buttonText"
          @click="emit('close')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  buttonText: string
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>

</style>
