<script setup lang="ts">
import { ref, computed } from 'vue'

const commentText = ref<string>('') // текст введенного комментария
const addedComments = ref([
  {
    author: 'Мира Гусева',
    text: 'Эти мгновения наполняют наши сердца радостью и любовью.',
    date: '9.04.2024 в 14:54'
  }
])

const maxCommentLength = 250
//Функкция добавления комментария
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
  const textarea = event.target as HTMLTextAreaElement
  textarea.classList.remove('textarea-focus')
  textarea.classList.remove('textarea-error')

  commentText.value = ''
  showCommentCounter.value = false
}

// Расширяем и добавляем стили textarea при фокусе
const onTextareaFocus = (event: Event) => {
  showCommentCounter.value = true
  const textarea = event.target as HTMLTextAreaElement

  // Убираем класс ошибки, если длина комментария меньше 250
  if (commentText.value.length <= maxCommentLength) {
    textarea.classList.add('textarea-focus')
    textarea.classList.remove('textarea-error')
  } else if (commentText.value.length > maxCommentLength) {
    textarea.classList.add('textarea-error')
  }
}

//Убираем стили, если фокус потерян
const onTextareaBlur = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement
  // Убираем класс фокуса
  textarea.classList.remove('textarea-focus')
  // Убираем класс ошибки и нормальный класс
  textarea.classList.remove('textarea-error')
}

// Добавляем стили для textare в зависимости от количества введеного текста
const onTextareaInput = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement

  if (commentText.value.length > maxCommentLength) {
    textarea.classList.add('textarea-error')

    textarea.classList.remove('textarea-focus')
  } else {
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
//Условие показа для счетчика символов и кнопок удаления/добавления комментария
const showCommentCounter = ref<boolean>(false)
</script>

<template>
  <!-- Секция комментариев -->
  <div class="flex flex-col gap-[10px] outline outline-2 outline-red-700">
    <div class="flex items-center gap-[6px] text-base leading-4">
      <p class="font-semibold tracking-tighter text-[#181C32]">Комментариев</p>
      <span class="font-medium tracking-tighter text-[#7E8299]">{{ addedComments.length }}</span>
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
          <span class="mr-auto" :class="{ 'text-[#f1416c]': commentText.length > maxCommentLength }"
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
              'bg-gray-300': commentText.length > maxCommentLength || commentText.length === 0,
              'bg-[#3E97FF]': commentText.length <= maxCommentLength && commentText.length >= 1
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
        <span class="text-xs font-medium leading-3 text-[#A1A5B7]">{{ addedComment.date }}</span>
      </div>
    </div>
  </div>
</template>
