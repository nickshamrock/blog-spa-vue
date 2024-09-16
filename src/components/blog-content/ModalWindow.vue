<script lang="ts" setup>
import { computed, ref } from 'vue'
import CommentSection from './modal-content/CommentSection.vue'
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
        class="modal-container m-auto w-[630px] rounded-xl bg-white p-[15px] transition-all duration-500 ease-in max-[800px]:w-2/3 max-[430px]:w-[350px]"
      >
        <div class="mb-[10px] flex items-center justify-between">
          <h3
            class="text-2xl font-semibold leading-6 tracking-tighter text-black max-[430px]:text-xl"
          >
            {{ title }}
          </h3>
          <button @click="$emit('close')" class="h-[20px] w-[20px] cursor-pointer">&#10005;</button>
        </div>

        <div
          class="mb-[15px] flex flex-wrap items-center text-sm leading-[14px] text-[#7E8299] max-[430px]:text-xs"
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
            <span>{{ formattedCommentsCount }} </span>
          </div>
        </div>

        <img
          :src="imageSrc"
          width="600"
          height="373"
          class="mb-[15px] block rounded-xl object-cover max-[430px]:h-[200px] max-[430px]:w-[320px]"
          :alt="title"
        />
        <p
          class="mb-[10px] text-base font-medium leading-[25px] text-black max-[430px]:text-sm max-[430px]:leading-5"
        >
          {{ text }}
        </p>

        <div class="mb-[15px] flex flex-wrap gap-[10px]">
          <span
            v-for="tag in tags"
            :key="tag"
            class="rounded-full bg-[#EEF6FF] px-[14px] py-[6px] text-sm font-medium leading-[14px] text-[#2884EF]"
          >
            {{ tag }}
          </span>
        </div>
        <CommentSection @updateCommentsCount="updateCommentsCount" />
      </div>
    </div>
  </Transition>
</template>

<style lang="sass" scoped>
.modal-enter-from
  opacity: 0

.modal-leave-to
  opacity: 0

.modal-enter-from .modal-container,
.modal-leave-to .modal-container
  transform: scale(1.1)
</style>
