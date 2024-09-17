<script lang="ts" setup>
import { computed, ref } from 'vue'
import CommentSection from './modal-content/CommentSection.vue'
import PostInfo from './modal-content/PostInfo.vue'
import PostText from './modal-content/PostText.vue'
import PostImage from './modal-content/PostImage.vue'
import PostTitle from './modal-content/PostTitle.vue'
import { getNumberSuffix } from '@/utils/GetNumberSuffix'

interface ModalWindowProps {
  show: boolean
  imageSrc: string
  date: string
  readTime: string
  comments: number
  title: string
  description: string
  tags: string[]
  text: string
}

const props = defineProps<ModalWindowProps>()

const commentsCount = ref(props.comments)

const updateCommentsCount = (newCount: number) => {
  commentsCount.value = newCount
}

const formattedCommentsCount = computed(() => getNumberSuffix(commentsCount.value))
</script>
<template>
  <Transition name="modal">
    <div v-show="show" class="fixed inset-0 z-50 flex h-full w-full overflow-y-auto bg-black/55">
      <div
        class="modal-container modal-mask m-auto flex max-w-[630px] flex-col gap-[15px] rounded-xl bg-white p-[15px] max-[800px]:w-2/3 max-[430px]:w-[350px]"
      >
        <div class="relative flex flex-col gap-[10px]">
          <button
            @click="$emit('close')"
            class="absolute right-0 top-0 h-[20px] w-[20px] cursor-pointer"
          >
            &#10005;
          </button>

          <PostTitle :title="title" />

          <PostInfo :comments="formattedCommentsCount" :readTime="readTime" :date="date" />
        </div>

        <PostImage :imageSrc="imageSrc" title="title" />

        <PostText :tags="tags" :text="text" />

        <CommentSection @updateCommentsCount="updateCommentsCount" />
      </div>
    </div>
  </Transition>
</template>

<style lang="sass" scoped>
.modal-enter-from .modal-container,
.modal-leave-to .modal-container
  transform: scale(1.1)

.modal-mask
  transition: all 0.5s ease-in
</style>
