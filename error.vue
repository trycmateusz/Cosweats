<template>
  <div>
    <TheNavigation />
    <div
      class="relative page-height"
    >
      <div class="relative wrapper flex flex-col justify-center items-center h-full">
        <img src="~/assets/img/error_box.svg" alt="" class="hidden absolute bottom-8 left-8 w-[60%]  max-w-[70vh] border-8 border-whiteishMain opacity-100 sm:block">
        <img src="~/assets/img/error_box_2.svg" alt="" class="hidden absolute bottom-8 right-8 w-[50%] max-w-[60vh] border-8 border-whiteishMain opacity-100 sm:block">
        <div class="flex flex-col items-center mb-10 z-20 sm:mb-16">
          <span class="relative bold text-6xl sm:text-9xl">
            {{ statusError?.statusCode }}
          </span>
          <span class="text-3xl sm:text-4xl">
            {{ fullMessage }}
          </span>
        </div>
        <AppButton
          text="Take me back!"
          style-type="primary"
          class="relative text-3xl z-20 sm:text-4xl"
          @click="goBack"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['active-status-error']
})
const { statusError, clearError } = useStatusError()
const router = useRouter()
const fullMessage = computed(() => {
  return `Oops, ${statusError.value?.message}.`
})
const goBack = () => {
  router.back()
  clearError()
}
</script>

<style scoped>
.page-height {
  height: Calc(100svh - var(--nav-height));
}
</style>
