<script setup lang="ts">
interface Comment {
  author: string
  text: string
  date: string
}

const props = defineProps<{
  comments: Comment[]
}>()

const getImagePath = (author: string): string => {
  if (author === 'Мира Гусева') {
    return './test/test-comment-author.png'
  }
  return './test/anonim-user.png'
}
</script>

<template>
  <div>
    <div
      v-for="(comment, index) in props.comments"
      :key="index"
      class="mb-[10px] flex items-start justify-start"
    >
      <img
        :src="getImagePath(comment.author)"
        class="mr-3 block"
        width="38"
        height="38"
        alt="comment-author"
      />
      <div class="flex flex-col gap-[6px]">
        <p class="text-base font-semibold leading-4 tracking-tight text-[#181C32]">
          {{ comment.author }}
        </p>
        <p class="text-sm font-medium leading-[14px] text-[#3F4254] max-[430px]:leading-5">
          {{ comment.text }}
        </p>
        <span class="text-xs font-medium leading-3 text-[#A1A5B7]">{{ comment.date }}</span>
      </div>
    </div>
  </div>
</template>
