<script setup lang="ts">
interface ModalWindowProps {
  title: string
}

defineProps<ModalWindowProps>()
</script>

<template>
  <h3
    class="w-[280px] text-2xl font-semibold leading-6 tracking-tighter text-black max-[430px]:text-xl"
  >
    {{ title }}
  </h3>
</template>
