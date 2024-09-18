<script setup lang="ts">
import BurgerMenu from './ui-components/BurgerMenu.vue'
import AppLogo from './ui-components/AppLogo.vue'
</script>

<template>
  <header class="w-full bg-black">
    <nav
      class="flex h-[62px] items-center gap-20 px-14 py-[15px] max-[800px]:h-[78px] max-[800px]:gap-[15px] max-[800px]:px-[22px]"
    >
      <div class="min-[801px]:hidden">
        <BurgerMenu />
      </div>
      <AppLogo />
      <div
        class="flex items-center gap-5 text-base font-semibold leading-4 text-white max-[800px]:hidden"
      >
        <a href="#">Главная</a>
        <a href="#" class="rounded-md bg-[#FFFFFF1A] px-[14px] py-2 text-[#3E97FF]">Блог</a>
      </div>
    </nav>
  </header>
</template>
