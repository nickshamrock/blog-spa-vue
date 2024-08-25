<script lang="ts" setup>
import { ref, defineProps, computed } from 'vue'

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

defineProps<ModalWindowProps>()

// Управление комментариями
const commentText = ref<string>('') // текст введенного комментария
const addedComments = ref([
  {
    author: 'Мира Гусева',
    text: 'Эти мгновения наполняют наши сердца радостью и любовью.',
    date: '9.04.2024 в 14:54'
  }
])

const maxCommentLength = 250

const addComment = () => {
  const date = new Date()
  const formattedDate = `${date.toLocaleDateString()} в ${date.toLocaleTimeString().slice(0, 5)}`
  addedComments.value.push({
    author: 'Аноним',
    text: commentText.value,
    date: formattedDate
  })
  commentText.value = ''
  showCommentCounter.value = false
}

// Функция для очистки комментария
const clearComment = (event: Event) => {
  commentText.value = ''
  showCommentCounter.value = false

  const textarea = event.target as HTMLTextAreaElement
  textarea.classList.remove('textarea-normal')
  textarea.classList.remove('textarea-focus')
  textarea.classList.remove('textarea-error')
}

// Расширяем и добавляем стили textarea при клике
const onTextareaFocus = (event: Event) => {
  showCommentCounter.value = true

  const textarea = event.target as HTMLTextAreaElement
  // Всегда добавляем класс фокуса
  textarea.classList.add('textarea-focus')
  // Убираем класс ошибки, если длина комментария меньше 250
  if (commentText.value.length <= maxCommentLength) {
    textarea.classList.remove('textarea-error')
    textarea.classList.add('textarea-normal')
  } else {
    textarea.classList.add('textarea-error')
    textarea.classList.remove('textarea-normal')
  }
}

const onTextareaBlur = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement
  // Убираем класс фокуса
  textarea.classList.remove('textarea-focus')
  // Убираем класс ошибки и нормальный класс
  textarea.classList.remove('textarea-error', 'textarea-normal')
}

// Обработка ввода текста для динамического обновления классов
const onTextareaInput = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement

  if (commentText.value.length > maxCommentLength) {
    textarea.classList.add('textarea-error')
    textarea.classList.remove('textarea-normal')
    textarea.classList.remove('textarea-focus')
  } else {
    textarea.classList.add('textarea-normal')
    textarea.classList.add('textarea-focus')
    textarea.classList.remove('textarea-error')
  }
}
// Преобразование строки даты в объект Date для сортировки
const parseDate = (dateStr: string): Date => {
  const [datePart, timePart] = dateStr.split(' в ')
  const [day, month, year] = datePart.split('.')
  const [hours, minutes] = timePart.split(':')
  return new Date(+year, +month - 1, +day, +hours, +minutes)
}

// Сортировка комментариев по дате
const sortedComments = computed(() => {
  return [...addedComments.value].sort((a, b) => {
    return parseDate(b.date).getTime() - parseDate(a.date).getTime() // Отсортировать в порядке убывания
  })
})

//Условие показа для счетчика символов
const showCommentCounter = ref<boolean>(false)
</script>

<template>
  <Transition name="modal">
    <div
      v-show="show"
      class="fixed left-0 top-0 z-50 flex h-full w-full overflow-hidden overflow-y-auto bg-black/55 transition-opacity duration-500 ease-out"
    >
      <div
        class="modal-container m-auto h-auto w-[630px] rounded-xl bg-white p-[15px] transition-all duration-500 ease-in max-[800px]:w-2/3 max-[430px]:w-[350px]"
      >
        <div class="mb-[10px] flex items-center justify-between">
          <h3
            class="text-2xl font-semibold leading-6 tracking-tighter text-black max-[430px]:text-xl"
          >
            {{ title }}
          </h3>
          <button @click="$emit('close')" class="h-[20px] w-[20px]">&#10005;</button>
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
            <span>{{ addedComments.length }} комментариев</span>
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
        <!-- Секция комментариев -->
        <div class="flex flex-col gap-[10px]">
          <div class="flex items-center gap-[6px] text-base leading-4">
            <h4 class="font-semibold tracking-tighter text-[#181C32]">Комментариев</h4>
            <span class="font-medium tracking-tighter text-[#7E8299]">{{
              addedComments.length
            }}</span>
          </div>
          <!-- Поле для ввода нового комментария -->
          <div class="relative">
            <textarea
              v-model="commentText"
              class="relative h-[52px] w-full resize-none rounded-lg border-[1px] border-solid border-[rgba(241,241,242,1)] py-[10px] pl-[15px] pr-[30px]"
              placeholder="Введите комментарий"
              maxlength="550"
              @focus="onTextareaFocus"
              @input="onTextareaInput"
              @blur="onTextareaBlur"
              name="comment-textarea"
            ></textarea>
            <button
              v-if="commentText.length > 0"
              @click="clearComment"
              class="absolute right-[20px] top-[10px]"
            >
              &#10005;
            </button>
            <!-- Счетчик количества символов -->
            <div
              v-show="showCommentCounter"
              class="flex text-left text-xs font-medium leading-3 text-[#7E8299]"
            >
              <p>
                <span
                  class="mr-auto"
                  :class="{ 'text-[#f1416c]': commentText.length > maxCommentLength }"
                  >{{ commentText.length }}
                </span>
                из 250 символов
              </p>
            </div>
            <!-- Кнопки управления -->
            <div class="flex justify-end gap-[10px]" v-show="showCommentCounter">
              <button
                @click="clearComment"
                class="rounded-md bg-[#EEF6FF] px-[34px] py-3 text-[13px] font-bold leading-[14px] text-[#3E97FF]"
              >
                Отмена
              </button>
              <button
                @click="addComment"
                :disabled="commentText.length > maxCommentLength || commentText.length === 0"
                :class="[
                  'rounded-md px-[13px] py-3 text-[13px] font-semibold leading-[14px] text-white',
                  {
                    'bg-gray-300':
                      commentText.length > maxCommentLength || commentText.length === 0,
                    'bg-[#3E97FF]':
                      commentText.length <= maxCommentLength && commentText.length >= 1
                  }
                ]"
              >
                Опубликовать
              </button>
            </div>
          </div>
          <!-- Список опубликованных комментариев -->
          <div
            v-for="(addedComment, index) in sortedComments"
            :key="index"
            class="mb-[1px] flex items-start justify-start"
          >
            <img
              src="/test/test-comment-author.png"
              class="mr-3 block"
              width="38"
              height="38"
              alt="comment-author"
            />
            <div class="flex flex-col gap-[6px]">
              <p class="text-base font-semibold leading-4 tracking-tight text-[#181C32]">
                {{ addedComment.author }}
              </p>
              <p class="text-sm font-medium leading-[14px] text-[#3F4254] max-[430px]:leading-5">
                {{ addedComment.text }}
              </p>
              <span class="text-xs font-medium leading-3 text-[#A1A5B7]">{{
                addedComment.date
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="sass" scoped>

  //Анимация модального окна
.modal-enter-from
  opacity: 0

.modal-leave-to
  opacity: 0

.modal-enter-from .modal-container,
.modal-leave-to .modal-container
  transform: scale(1.1)

  //Стили для рамки textarea, которые используются в функциях onTextarea*
.textarea-normal
  border: 1px solid rgba(62, 151, 255, 1) // Синяя рамка
  outline: 2px solid rgba(62, 151, 255, 0.32) // Синяя обводка
  height: auto

.textarea-error
  border: 1px solid rgba(241, 65, 108, 1) // Красная рамка
  outline: 2px solid rgba(241, 65, 108, 0.32) // Красная обводка
  height: 113px

.textarea-focus
  height: 113px
  border: 1px solid rgba(62, 151, 255, 1) // Синяя рамка
  outline: 2px solid rgba(62, 151, 255, 0.32) // Синяя обводка

.textarea-blur
  height: auto
</style>
