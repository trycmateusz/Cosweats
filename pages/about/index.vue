<template>
  <div id="content" class="text-center">
    <TheNavigation />
    <header class="flex flex-col justify-center items-center gap-16 p-8 min-h-[Calc(100svh_-_var(--nav-height))] text-blackishMain overflow-hidden">
      <h1 class="wrapper flex flex-col font-halibutSerifRegular text-6xl sm:text-8xl">
        You cannot
        <span>get more
          <AppGlow glow="light">
            <span class="relative z-20">comfy</span>
          </AppGlow>
        </span>
        <span>than</span>
        <span class="font-violetSans text-pinkDark text-7xl sm:text-9xl">Cosweats</span>
      </h1>
      <AppArrow
        class="header-arrow"
        anchor="#main-content"
      />
    </header>
    <header
      id="main-content"
      class="flex flex-col justify-center items-center p-16 min-h-[Calc(100svh_-_var(--nav-height))] bg-whiteishPink font-halibutSerifRegular"
    >
      <h2 class="wrapper flex flex-col items-center uppercase p-8 text-5xl sm:text-6xl md:text-7xl text-pinkDark">
        we are presenting
        <span class="block mt-4 font-violetSans">maximum level of comfort</span>
        <span class="block mt-4 mb-16">with our clothing</span>
        <span>
          <span class="text-6xl sm:text-7xl md:text-8xl tracking-widest leading-[1.1em]">
            no matter
          </span>
          the gender and/or body type
        </span>
        <AppLink
          class="mt-16 text-3xl font-violetSans max-w-max sm:text-4xl md:text-5xl"
          link="/"
          style-type="primary"
          text="See for yourself"
        />
      </h2>
    </header>
    <main>
      <section class="text-center text-blackishMain">
        <h2 class="flex flex-col justify-center items-center mt-16 mb-16 uppercase text-3xl sm:mb-16 sm:text-4xl md:text-5xl">
          <span class="font-violetSans">check who works</span>
          <span class="font-halibutSerifRegular">on the whole project</span>
        </h2>
        <div class="occupations flex flex-col gap-8 sm:gap-0">
          <div class="ceo wrapper p-16  flex gap-8 relative">
            <img
              src="~/assets/img/ceo.svg"
              alt="A picture of Cosweats CEO - Aisha"
              class="hidden sm:block max-w-[40%] max-h-[320px] md:max-h-[400px] xl:max-h-[60svh]"
            >
            <div class="text flex flex-col items-center justify-center ml-auto flex-grow sm:w-[60%]">
              <h3 class="flex flex-col items-center justify-center mb-8 sm:mb-16 text-center leading-none">
                <span class="uppercase text-2xl sm:text-4xl">aisha</span>
                <span class="text-xl sm:text-2xl text-grayDark">Ceo of Cosweats</span>
              </h3>
              <p class="text-xl sm:text-2xl font-halibutSerifRegular">
                Her dream was always to create something that’s accessible and affordable for people who at the moment don’t have that many options. She then studied marketing and with the help of her friends, Cosweats came to life.
              </p>
            </div>
            <div class="mobile-mask absolute left-0 top-0 sm:hidden h-full aspect-[3/4] bg-[url('~/assets/img/ceo_mobile.svg')] bg-cover opacity-30 z-[-1]" />
          </div>
          <div class="designer wrapper p-16  flex gap-8 relative mb-16">
            <div class="text flex flex-col items-center justify-center sm:w-[60%] ml-auto flex-grow">
              <h3 class="flex flex-col items-center justify-center mb-8 sm:mb-16 text-center leading-none">
                <span class="uppercase text-2xl sm:text-4xl">sarah</span>
                <span class="text-xl sm:text-2xl text-grayDark">Lead Fashion Designer</span>
              </h3>
              <p class="text-xl sm:text-2xl font-halibutSerifRegular">
                As a fan of clothing since her early chlidhood days, she was always experimenting with different fabrics to create something unique. Before Cosweats she released several collections where she showcased her unique ideas and style.
              </p>
            </div>
            <img
              src="~/assets/img/designer.svg"
              alt="A picture of Cosweats Lead Designer - Sarah"
              class="hidden sm:block max-w-[40%] max-h-[320px] md:max-h-[400px] xl:max-h-[60svh]"
            >
            <div class="mobile-mask absolute right-0 top-0 h-full aspect-[7/10] bg-[url('~/assets/img/designer_mobile.svg')] bg-cover opacity-30 z-[-1] sm:hidden" />
          </div>
          <section class="models overflow-hidden">
            <h2 class="p-16 text-4xl text-center uppercase sm:text-4xl md:text-5xl">
              meet our models
            </h2>
            <ModelList />
          </section>
        </div>
      </section>
      <div class="outro-evoker relative h-[100vh]">
        <Transition name="outro-partly-visible">
          <div
            v-if="outroPartlyVisible"
            class="outro-start fixed top-0 w-full h-full bg-blackishDark z-30"
          >
            <AppArrow
              class="fixed bottom-[10%] left-1/2 -translate-x-1/2 z-30"
              anchor="#outro"
            />
          </div>
        </Transition>
        <section
          ref="outro"
          class="outro relative flex flex-col justify-center items-center h-full p-16 bg-blackishDark opacity-0 pointer-events-none transition-opacity z-40"
          :class="{
            'partly-visible': outroPartlyVisible,
            'fully-visible': outroFullyVisible
          }"
        >
          <div
            id="outro"
            class="relative z-50"
          >
            <h2 class="flex flex-col font-halibutSerifRegular text-whiteishMain text-4xl sm:text-5xl md:text-6xl">
              Since you got to know us,
              <span>let us introduce our</span>
              <span class="block mt-4 font-violetSans text-pinkDark text-5xl sm:text-6xl md:text-7xl">Offer</span>
            </h2>
            <AppLink
              class="mt-8 text-2xl sm:text-3xl md:text-4xl"
              link="/"
              style-type="secondary"
              text="Show me your goods!"
            />
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
const outro = ref<HTMLDivElement | undefined>(undefined)
const outroPartlyVisible = ref(false)
const outroFullyVisible = ref(false)
useIntersectionObserver(outro, ([{ isIntersecting, intersectionRatio }]) => {
  if (isIntersecting) {
    const visibleRatio = Math.ceil(intersectionRatio * 100)
    if (visibleRatio >= 40 && visibleRatio < 80 && !outroPartlyVisible.value) {
      outroPartlyVisible.value = true
      outroFullyVisible.value = false
    } else if (visibleRatio >= 80 && !outroFullyVisible.value) {
      outroFullyVisible.value = true
    } else {
      outroFullyVisible.value = false
    }
  } else {
    outroFullyVisible.value = false
    outroPartlyVisible.value = false
  }
}, {
  threshold: [0.5, 0.90]
})
useHead({
  title: 'Cosweats - Comfy and Affordable Clothing',
  meta: [
    { name: 'description', content: 'Shop with clothes that all people will find affordable and comfortable, that are manufactured with quality and durability in mind. See for yourself!' }
  ]
})
</script>

<style scoped>
.fully-visible {
  opacity: 1;
  pointer-events: all
}
.outro-partly-visible-enter-active,
.outro-partly-visible-leave-active {
  transition: opacity 0.3s ease;
}

.outro-partly-visible-enter-from,
.outro-partly-visible-leave-to {
  opacity: 0;
}
</style>
