<script setup lang="ts">
import ModalWindow from '@/components/blog-content/ModalWindow.vue'
import PostInfo from './modal-content/PostInfo.vue'
import { ref, computed } from 'vue'
import { getNumberSuffix } from '@/utils/GetNumberSuffix'

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

const props = defineProps<CardProps>()

const numberOfComments = computed(() => getNumberSuffix(props.comments))
</script>
<template>
  <div
    class="flex w-auto max-w-[400px] cursor-pointer flex-col gap-[10px] max-[980px]:w-[365px] max-[780px]:w-[325px]"
    @click="showModal = true"
  >
    <img class="h-[250px] w-full rounded-xl object-cover" :src="imageSrc" :alt="title" />

    <PostInfo :readTime="readTime" :date="date" :comments="numberOfComments" />

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
