<template>
  <div>
    <ClientOnly>
      <a
        :aria-label="`Link redirecting to ${anchor}`"
        :href="anchor"
        class="arrow w-32 h-32 animate-pulse rounded-full focus:outline-offset-8"
      >
        <img
          src="~/assets/img/arrow_down.svg"
          alt=""
        >
      </a>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  anchor: string
}>()
</script>

<style lang="scss" scoped>
.arrow.header-arrow {
  display: none;
}
@media (max-width: 575px) and (min-height: 350px){
  .arrow.header-arrow {
    display: inline;
  }
}
@media (min-width: 576px) and (min-height: 460px){
  .arrow.header-arrow {
    display: inline;
  }
}
@media (min-width: 768px) and (min-height: 500px){
  .arrow.header-arrow {
    display: inline;
  }
}
@media (min-width: 992px) and (min-height: 550px){
  .arrow.header-arrow {
    display: inline;
  }
}
@media (min-width: 1200px) and (min-height: 600px){
  .arrow.header-arrow {
    display: inline;
  }
}
@media (min-width: 1400px) and (min-height: 660px){
  .arrow.header-arrow {
    display: inline;
  }
}
</style>
