<script setup lang="ts">
interface ModalWindowProps {
  imageSrc: string
  title: string
}

defineProps<ModalWindowProps>()
</script>

<template>
  <img
    :src="imageSrc"
    width="600"
    height="373"
    class="block rounded-xl object-cover max-[430px]:h-[200px] max-[430px]:w-[320px]"
    :alt="title"
  />
</template>
