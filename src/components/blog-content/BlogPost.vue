<script setup lang="ts">
import ModalWindow from '../ModalWindow.vue'
import { defineProps } from 'vue'
import { ref } from 'vue'

//показ модального окна
const showModal: any = ref(false)

interface CardProps {
  imageSrc: string
  date: string
  readTime: string
  comments: number
  title: string
  description: string
  tags: string[]
  text: string
}

defineProps<CardProps>()
</script>
<template>
  <div class="flex h-auto w-[400px] cursor-pointer flex-col gap-[10px]" @click="showModal = true">
    <img class="h-[250px] w-[450px] rounded-xl object-cover" :src="imageSrc" :alt="title" />

    <div class="flex flex-wrap items-center text-sm leading-[14px] text-[#7E8299]">
      <span>{{ date }}</span>
      <span class="mx-[10px] block text-[10px] font-semibold leading-[10px]">•</span>
      <div class="flex items-center">
        <img src="/svg/time.svg" class="mr-[7px] block" height="14px" width="14px" />
        <span>{{ readTime }}</span>
      </div>
      <span class="mx-[10px] block text-[10px] font-semibold leading-[10px]">•</span>
      <div class="flex items-center">
        <img src="/svg/messages.svg" class="mr-[5px] block" height="14px" width="14px" />
        <span>{{ comments }} комментариев</span>
      </div>
    </div>

    <h2 class="text-[22px] font-semibold leading-[22px] tracking-tight text-black">
      {{ title }}
    </h2>

    <p class="text-base font-medium leading-[25px] text-black">
      {{ description }}
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

    <Teleport to="body">
      <ModalWindow
        :show="showModal"
        @close="showModal = false"
        :title="title"
        :text="text"
        :imageSrc="imageSrc"
        :date="date"
        :readTime="readTime"
        :comments="comments"
        :description="description"
        :tags="tags"
      />
    </Teleport>
  </div>
</template>
