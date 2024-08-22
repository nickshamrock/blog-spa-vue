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
  if (commentText.value.length > maxCommentLength) return // Не добавлять комментарий, если превышен лимит
  const date = new Date()
  const formattedDate = `${date.toLocaleDateString()} в ${date.toLocaleTimeString().slice(0, 5)}`
  addedComments.value.push({
    author: 'Аноним',
    text: commentText.value,
    date: formattedDate
  })
  commentText.value = ''
}

// Функция для очистки комментария
const clearComment = () => {
  commentText.value = ''
}

// Состояние фокуса textarea

// Расширяем и добавляем стили textarea при клике
const onTextareaFocus = (event: Event) => {
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
</script>

<template>
  <Transition name="modal">
    <div
      v-show="show"
      class="fixed left-0 top-0 z-50 flex h-full w-full overflow-y-auto bg-black/55 transition-opacity duration-500 ease-out"
    >
      <div
        class="modal-container m-auto w-3/4 rounded-xl bg-white p-5 transition-all duration-500 ease-in"
      >
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-black">{{ title }}</h3>
          <button @click="$emit('close')" class="close-button">
            &#10005;
            <!-- Крестик для закрытия -->
          </button>
        </div>

        <div class="flex text-cyan-900">
          <span>{{ date }}</span>
          <span>{{ readTime }}</span>
          <span>{{ addedComments.length }} комментариев</span>
        </div>
        <img :src="imageSrc" :alt="title" />
        <p class="text-black">{{ text }}</p>
        <div class="flex space-x-2 pt-2">
          <span
            v-for="tag in tags"
            :key="tag"
            class="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-500"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Секция комментариев -->
        <div class="comments-section mt-4">
          <h4 class="text-lg font-semibold text-black">Комментариев {{ addedComments.length }}</h4>

          <!-- Поле для ввода нового комментария -->
          <div class="relative">
            <textarea
              v-model="commentText"
              class="h-[52px] w-full resize-none rounded-lg border-[1px] border-solid border-[rgba(241,241,242,1)] p-3"
              placeholder="Введите комментарий"
              maxlength="550"
              @focus="onTextareaFocus"
              @blur="onTextareaBlur"
              @input="onTextareaInput"
            ></textarea>
            <button v-if="commentText.length > 0" @click="clearComment" class="clear-button">
              &#10005;
            </button>
            <!-- скорректировать позиционирование кнопке -->
          </div>

          <!-- Список комментариев -->
          <div
            v-for="(addedComment, index) in sortedComments"
            :key="index"
            class="comment mb-4 rounded-lg bg-gray-100 p-4"
          >
            <p class="font-bold text-gray-700">{{ addedComment.author }}</p>
            <p class="text-gray-700">{{ addedComment.text }}</p>
            <span class="text-sm text-gray-500">{{ addedComment.date }}</span>
          </div>

          <!-- Счётчик количества символов -->
          <div
            :class="[
              'mt-2 text-right text-sm',
              { 'text-red-500': commentText.length > maxCommentLength }
            ]"
          >
            {{ commentText.length }} из 250 символов
          </div>

          <!-- Кнопки управления -->
          <div class="mt-2 flex justify-end space-x-4">
            <button @click="clearComment" class="rounded-lg bg-gray-300 px-4 py-2">Отмена</button>
            <button
              @click="addComment"
              :disabled="commentText.length > maxCommentLength"
              :class="[
                'rounded-lg px-4 py-2 text-white',
                {
                  'bg-gray-300': commentText.length > maxCommentLength,
                  'bg-blue-500': commentText.length <= maxCommentLength
                }
              ]"
            >
              Опубликовать
            </button>
          </div>
        </div>
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


.close-button
  background: none
  border: none
  font-size: 1.5rem
  cursor: pointer
  color: #000

.clear-button
  position: absolute
  top: 50%
  right: 10px
  transform: translateY(-50%)
  background: none
  border: none
  font-size: 1.2rem
  cursor: pointer
  color: #000

  .textarea-normal
  border: 1px solid rgba(62, 151, 255, 1) // Синяя рамка
  outline: 2px solid rgba(62, 151, 255, 0.32) // Синяя обводка
  height: 113px


.textarea-error
  border: 1px solid rgba(241, 65, 108, 1) // Красная рамка
  outline: 2px solid rgba(241, 65, 108, 0.32)
  height: 113px // Красная обводка


.textarea-focus
  height: 113px
  border: 1px solid rgba(62, 151, 255, 1) // Синяя рамка
  outline: 2px solid rgba(62, 151, 255, 0.32) // Синяя обводка



.textarea-blur
  height: 52px
</style>

.comment-input border-color: #d1d5db outline: none &.outline-red-500 outline: 2px solid #f87171
&.outline-blue-500 outline: 2px solid #3b82f6
