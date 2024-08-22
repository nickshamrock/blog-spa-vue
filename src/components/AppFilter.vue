<script lang="ts" setup>
import { ref, watch } from 'vue'
import store from '@/store'

const showFilters = ref<boolean>(false)
const searchQuery = ref<string>(store.searchQuery)
const filters = ref<string[]>([
  'Город',
  'Природа',
  'Люди',
  'Животные',
  'Еда',
  'Напитки',
  'Архитектура',
  'Искусство'
])
const selectedFilters = ref<string[]>(store.selectedFilters)

// Функция для проверки, является ли фильтр активным
const isActiveFilter = (filter: string): boolean => {
  return selectedFilters.value.includes(filter.replace(' +', ''))
}

// Функция для переключения фильтра
const toggleFilterSelection = (filter: string): void => {
  const cleanFilter = filter.replace(' +', '') // Удаление знака "+"
  const index = selectedFilters.value.indexOf(cleanFilter)
  if (index > -1) {
    selectedFilters.value.splice(index, 1)
  } else {
    selectedFilters.value.push(cleanFilter)
  }
  store.selectedFilters = selectedFilters.value // Обновляем хранилище
}

// Функция для очистки фильтров и поиска
const clearFilters = (): void => {
  selectedFilters.value = []
  store.selectedFilters = []
  searchQuery.value = ''
  store.searchQuery = ''
}

// Слежение за изменениями в searchQuery
watch(searchQuery, (newValue) => {
  store.searchQuery = newValue
})

// Слежение за изменениями в selectedFilters
watch(selectedFilters, (newValue) => {
  store.selectedFilters = newValue
})

// Функция для переключения видимости фильтров
const toggleFilter = (): void => {
  showFilters.value = !showFilters.value
}

const inputField = ref<HTMLInputElement | null>(null)

const addOutline = () => {
  if (inputField.value) {
    inputField.value.style.border = '1px solid #3E97FF'
  }
}

// Функция для удаления рамки
const removeOutline = () => {
  if (inputField.value) {
    inputField.value.style.border = 'none'
  }
}

const changeIcon = () => {
  alert('На меня кликнули!')
}
</script>

<template>
  <div class="bg-white">
    <div class="px-[95px] py-5">
      <div class="flex items-center gap-10">
        <h1 class="text-[32px] font-bold leading-8 text-[#181C32]">Блог</h1>
        <div class="relative flex items-center">
          <img
            src="/svg/search-icon.svg"
            class="absolute left-3 block"
            width="14px"
            height="14px"
          />
          <input
            v-model="searchQuery"
            class="input-filter h-[40px] w-[400px] rounded-md bg-[#F9F9F9] px-[34px] py-[13px]"
            type="text"
            placeholder="Поиск"
            name="input"
            @mouseenter="addOutline"
            @mouseleave="removeOutline"
            ref="inputField"
          />
        </div>
        <div class="text-[#A1A5B7 ] ml-auto">
          <button
            v-if="selectedFilters.length > 0"
            @click="clearFilters"
            class="mr-[10px] text-sm font-medium leading-[14px] text-[#2884EF]"
          >
            Очистить
          </button>
          <button @click="toggleFilter" class="text-sm font-medium leading-[14px] text-[#A1A5B7]">
            {{ showFilters && selectedFilters.length === 0 ? 'Скрыть фильтр' : 'Фильтр' }}
            <img
              :class="{ rotate: showFilters }"
              class="arrow"
              src="/public/svg/arrow.svg"
              width="10px"
              height="6px"
            />
          </button>
        </div>
      </div>

      <div v-if="showFilters" class="filter-buttons">
        <button
          v-for="filter in filters"
          :key="filter"
          @click="toggleFilterSelection(filter), changeIcon()"
          :class="{ active: isActiveFilter(filter) }"
        >
          {{ filter }} <img class="block" src="/public/svg/plus.svg" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

.input-filter
  &:focus
    outline: 2px solid rgba(62, 151, 255, 0.32)
  &:active
    outline: 2px solid rgba(62, 151, 255, 0.32)
  &::placeholder
    font-size: 13px
    font-weight: 500
    color: #D8D8E5

//   .button-group
//     display: flex
//     align-items: center
//     margin-left: auto

  // .clear-button
  //   background: none
  //   color: #000
  //   font-size: 14px
  //   cursor: pointer


.arrow
  display: inline-block

.rotate
  transform: rotate(180deg)

.filter-buttons
  padding-top: 20px
  padding-bottom: 20px
  display: flex
  gap: 8px
  flex-wrap: wrap

  button
    display: flex
    align-items: center
    gap: 10px
    color: #2884EF
    background-color: #EEF6FF
    border-radius: 20px
    padding: 6px 14px
    font-size: 16px
    line-height: 16px
    font-weight: 500
    transition: background-color 0.2s ease

    &:hover
      background-color: #e0f0ff

    &.active
      background-color: red   // Изменение цвета кнопки при активации
      border-color: red      // Цвет границы при активации
      color: red
</style>
