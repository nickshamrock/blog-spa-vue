<script setup lang="ts">
interface propsInfo {
  date: string
  readTime: string
  comments: string
}

defineProps<propsInfo>()
</script>

<template>
  <div
    class="flex flex-wrap items-center text-sm leading-[14px] text-[#7E8299] max-[430px]:text-xs"
  >
    <span>{{ date }}</span>
    <span class="mx-[10px] block text-[10px] font-semibold leading-[10px]">•</span>
    <div class="flex items-center">
      <img src="/svg/time.svg" class="mr-[7px] block" height="14px" width="14px" />
      <span>{{ readTime }}</span>
    </div>
    <span class="mx-[10px] block text-[10px] font-semibold leading-[10px]">•</span>
    <div class="flex items-center">
      <img src="/svg/messages.svg" class="mr-[5px] block" height="14px" width="14px" />
      <span>{{ comments }} </span>
    </div>
  </div>
</template>
