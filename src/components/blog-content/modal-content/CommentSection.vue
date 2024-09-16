<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import CommentInput from './CommentInput.vue'
import CommentList from './CommentList.vue'
import { sortComments } from '@/utils/SortCommentsByDate'

const addedComments = ref([
  {
    author: 'Мира Гусева',
    text: 'Эти мгновения наполняют наши сердца радостью и любовью.',
    date: '9.04.2024 в 14:54'
  }
])

const addComment = (newComment: { author: string; text: string; date: string }) => {
  addedComments.value.push(newComment)
}

const sortedComments = computed(() => sortComments(addedComments.value))

const emit = defineEmits(['updateCommentsCount'])

watch(
  () => addedComments.value.length,
  (newCount) => {
    emit('updateCommentsCount', newCount)
  }
)
</script>

<template>
  <div class="flex flex-col gap-[10px]">
    <div class="flex items-center gap-[6px] text-base leading-4">
      <p class="font-semibold tracking-tighter text-[#181C32]">Комментариев</p>
      <span class="font-medium tracking-tighter text-[#7E8299]">{{ addedComments.length }}</span>
    </div>

    <CommentInput @addComment="addComment" />
    <CommentList :comments="sortedComments" />
  </div>
</template>
