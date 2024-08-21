<script setup lang="ts">
import { defineProps } from 'vue'

interface CardProps {
  imageSrc: string
  date: string
  readTime: string
  comments: number
  title: string
  description: string
  tags: string[]
}

defineProps<CardProps>()
</script>
<template>
  <div class="flex h-auto w-1/3 flex-col outline outline-1 outline-cyan-50">
    <img class="h-48 w-full object-cover" :src="imageSrc" width="400" height="250" :alt="title" />

    <div class="flex flex-col space-y-2 p-4">
      <div class="flex items-center space-x-2 text-sm text-gray-500">
        <span>{{ date }}</span>
        <span>•</span>
        <span>{{ readTime }}</span>
        <span>•</span>
        <span>{{ comments }} комментариев</span>
      </div>

      <h3 class="text-lg font-semibold text-white">
        {{ title }}
      </h3>

      <p class="text-sm text-white">
        {{ description }}
      </p>

      <div class="flex space-x-2 pt-2">
        <span
          v-for="tag in tags"
          :key="tag"
          class="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-500"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <!-- <img src="http://placehold.it/400x250" width="400" height="250" /> -->
  </div>
</template>
