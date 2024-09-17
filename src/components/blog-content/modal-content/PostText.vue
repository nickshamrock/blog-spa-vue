<script setup lang="ts">
interface ModalWindowProps {
  text: string
  tags: string[]
}

defineProps<ModalWindowProps>()
</script>

<template>
  <div class="flex flex-col gap-[10px]">
    <p
      class="text-base font-medium leading-[25px] text-black max-[430px]:text-sm max-[430px]:leading-5"
    >
      {{ text }}
    </p>
    <div class="flex flex-wrap gap-[10px]">
      <span
        v-for="tag in tags"
        :key="tag"
        class="rounded-full bg-[#EEF6FF] px-[14px] py-[6px] text-sm font-medium leading-[14px] text-[#2884EF]"
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>
