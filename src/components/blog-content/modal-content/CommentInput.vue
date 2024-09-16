<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits(['addComment'])

const commentText = ref<string>('')
const showCommentCounter = ref<boolean>(false)
const maxCommentLength = 250

const clearComment = () => {
  commentText.value = ''
  showCommentCounter.value = false
}

const addComment = () => {
  const date = new Date()
  const formattedDate = `${date.toLocaleDateString()} в ${date.toLocaleTimeString().slice(0, 5)}`
  emit('addComment', {
    author: 'Аноним',
    text: commentText.value,
    date: formattedDate
  })
  clearComment()
}

const textareaClass = computed(() => {
  if (commentText.value.length > maxCommentLength) {
    return 'border-red-500 outline outline-2 outline-red-200 h-[113px]'
  }
  if (commentText.value.length > 0) {
    return 'border-blue-500 outline outline-2 outline-blue-200 h-[113px]'
  }
  return 'border-gray-200'
})

const showPublishButton = computed(
  () => commentText.value.length <= maxCommentLength && commentText.value.length > 0
)
</script>

<template>
  <div class="relative">
    <textarea
      v-model="commentText"
      @focus="showCommentCounter = true"
      class="relative h-[52px] w-full resize-none rounded-lg border py-[10px] pl-[15px] pr-[30px] focus:outline"
      :class="textareaClass"
      placeholder="Введите комментарий"
      maxlength="550"
    ></textarea>

    <button
      v-if="commentText.length > 0"
      @click="clearComment"
      class="absolute right-[20px] top-[10px]"
    >
      &#10005;
    </button>

    <div v-if="showCommentCounter" class="flex text-xs font-medium text-[#7E8299]">
      <p>
        <span :class="{ 'text-red-500': commentText.length > maxCommentLength }">{{
          commentText.length
        }}</span>
        из {{ maxCommentLength }} символов
      </p>
    </div>

    <div class="flex justify-end gap-[10px]" v-if="showCommentCounter">
      <button
        @click="clearComment"
        class="rounded-md bg-[#EEF6FF] px-[34px] py-3 text-[13px] font-bold text-[#3E97FF]"
      >
        Отмена
      </button>

      <button
        @click="addComment"
        :disabled="!showPublishButton"
        :class="[
          'rounded-md px-[13px] py-3 text-[13px] font-semibold text-white',
          { 'bg-gray-300': !showPublishButton, 'bg-[#3E97FF]': showPublishButton }
        ]"
      >
        Опубликовать
      </button>
    </div>
  </div>
</template>
