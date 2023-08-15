<template>
  <div class="text-center">
    <header class="flex flex-col justify-center items-center gap-16 p-8 min-h-[100svh] text-blackishMain">
      <h1 class="wrapper flex flex-col font-halibutSerifRegular text-6xl sm:text-8xl">
        You cannot
        <span>get more <GlobalAppGlow glow="dark">comfy</GlobalAppGlow></span>
        <span>than</span>
        <span class="font-violetSans text-pinkDark text-7xl sm:text-9xl">Cosweats</span>
      </h1>
      <GlobalAppArrow class="header-arrow" anchor="#content"></GlobalAppArrow>
    </header>
    <header id="content" class="flex flex-col justify-center items-center p-16 min-h-[100svh] bg-whiteishPink font-halibutSerifRegular">
      <h2 class="wrapper flex flex-col uppercase text-5xl sm:text-6xl md:text-7xl text-pinkDark">
        we are presenting
        <span class="block mt-4 mb-16 font-violetSans">maximum level of comfort</span>
        <span>
          with our clothing<br>
          <span class="text-6xl sm:text-7xl md:text-8xl tracking-widest leading-[1.1em]">
            no matter
          </span>
          the gender and/or body type
        </span>
      </h2>
    </header>
    <section class="text-center text-blackishMain">
      <h2 class="flex flex-col justify-center items-center mb-16  sm:mb-32 uppercase text-5xl sm:text-6xl md:text-7xl">
        <span class="font-violetSans">check who works</span>
        <span class="font-halibutSerifRegular">on the whole project</span>
      </h2>
      <div class="occupations flex flex-col gap-16">
        <div class="ceo wrapper p-16  flex gap-8 relative">
          <img src="ceo.svg" alt="A picture of Cosweats CEO - Aisha" class="hidden sm:block max-w-[40%] max-h-[600px]">
          <div class="text flex flex-col items-center justify-center sm:w-[60%] ml-auto flex-grow">
            <h3 class="flex flex-col items-center justify-center mb-8 sm:mb-16 text-center leading-none">
              <span class="uppercase text-4xl sm:text-6xl">aisha</span>
              <span class="text-2xl sm:text-4xl text-grayDark">Ceo of Cosweats</span>
            </h3>
            <p class="text-2xl sm:text-4xl font-halibutSerifRegular">
              Her dream was always to create something that’s accessible and affordable for people who at the moment don’t have that many options. She then studied marketing and with the help of her friends, Cosweats came to life. 
            </p>
          </div>
          <div class="mobile-mask absolute left-0 top-0 sm:hidden h-full aspect-[3/4] bg-[url('ceo_mobile.svg')] bg-cover opacity-30 z-[-1]"></div>
        </div>
        <div class="designer wrapper p-16  flex gap-8 relative mb-16 sm:mb-32">
          <div class="text flex flex-col items-center justify-center sm:w-[60%] ml-auto">
            <h3 class="flex flex-col items-center justify-center mb-8 sm:mb-16 text-center leading-none">
              <span class="uppercase text-4xl sm:text-6xl">sarah</span>
              <span class="text-2xl sm:text-4xl text-grayDark">Lead Fashion Designer</span>
            </h3>
            <p class="text-2xl sm:text-4xl font-halibutSerifRegular">
              As a fan of clothing since her early chlidhood days, she was always experimenting with different fabrics to create something unique. Before Cosweats she released several collections where she showcased her unique ideas and style. 
            </p>
          </div>
          <img src="designer.svg" alt="A picture of Cosweats Lead Designer - Sarah" class="hidden sm:block max-w-[40%] max-h-[600px]">
          <div class="mobile-mask absolute right-0 top-0 sm:hidden h-full aspect-[7/10] bg-[url('designer_mobile.svg')] bg-cover opacity-30 z-[-1]"></div>
        </div>
        <section class="models p-16">
          <h2 class="mb-16 sm:mb-32 text-5xl sm:text-6xl md:text-7xl text-center uppercase">
            meet our models
          </h2>
          <div class="models-box flex flex-col"></div>
        </section>
      </div>
      
    </section>
  </div>
</template>

<script setup lang="ts">
</script>