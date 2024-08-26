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
    resetIcon(cleanFilter) //вызываем функцию для смены иконки на плюс сразу после деактивации
  } else {
    selectedFilters.value.push(cleanFilter)
    showCrossIcon(cleanFilter) //вызываем функцию для смены иконки
  }
  store.selectedFilters = selectedFilters.value // Обновляем хранилище
}

// Функция для очистки фильтров и поиска
const clearFilters = (): void => {
  selectedFilters.value = []
  store.selectedFilters = []
  searchQuery.value = ''
  store.searchQuery = ''
  resetAllIcons() //вызываем функцию, чтобы добавить плюс для всех кнопок
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

// Функция для очистки строки поиска
const clearSearch = (): void => {
  searchQuery.value = ''
}

// Логика изменения значка на кнопках-фильтрах
const currentIcons = ref<Record<string, string>>({})

filters.value.forEach((filter) => {
  currentIcons.value[filter] = '/svg/plus.svg'
})

const showCrossIcon = (filter: string): void => {
  if (isActiveFilter(filter)) {
    currentIcons.value[filter] = '/svg/cross.svg'
  }
}

const resetIcon = (filter: string): void => {
  if (isActiveFilter(filter)) {
    currentIcons.value[filter] = '/svg/check.svg'
  } else {
    currentIcons.value[filter] = '/svg/plus.svg'
  }
}

const getIcon = (filter: string): string => {
  return currentIcons.value[filter] || '/svg/plus.svg'
}

//функция возврата плюсиков на фильтры
const resetAllIcons = (): void => {
  filters.value.forEach((filter) => {
    currentIcons.value[filter] = 'svg/plus.svg'
  })
}

const inputField = ref<HTMLInputElement | null>(null)

//Функция добавления рамки на поле input при наведении
const addOutline = () => {
  if (inputField.value) {
    inputField.value.style.border = '1px solid #3E97FF'
  }
}

// Функция для удаления рамки на поле input
const removeOutline = () => {
  if (inputField.value) {
    inputField.value.style.border = 'none'
  }
}
</script>

<template>
  <div class="app-filter-container w-full bg-white">
    <div class="app-filter-wrapper px-[95px] py-5" v-auto-animate>
      <div class="app-filter-header flex items-center gap-10">
        <h1 class="app-filter-title text-[32px] font-bold leading-8 text-[#181C32]">Блог</h1>
        <div class="app-filter-input-container relative flex items-center">
          <img
            src="/svg/search-icon.svg"
            class="absolute left-3 block"
            width="14px"
            height="14px"
          />
          <input
            v-model="searchQuery"
            class="input-filter h-[40px] w-full rounded-md bg-[#F9F9F9] px-[34px] py-[13px]"
            type="text"
            placeholder="Поиск"
            name="input"
            @mouseenter="addOutline"
            @mouseleave="removeOutline"
            ref="inputField"
          />
          <span
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute right-[10px] inline-block cursor-pointer text-[10px] text-gray-500"
          >
            &#10005;
          </span>
        </div>
        <div class="ml-auto">
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
              class="inline-block"
              src="/svg/arrow.svg"
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
          @click="toggleFilterSelection(filter)"
          :class="{ active: isActiveFilter(filter) }"
          @mouseenter="showCrossIcon(filter)"
          @mouseleave="resetIcon(filter)"
        >
          {{ filter }}
          <img :src="getIcon(filter)" class="block max-sm:h-[9.3px] max-sm:w-[9.3px]" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

@font-face
  font-family: 'Gilroy'
  font-style: normal
  font-weight: 700
  src:
    local:('Gilroy'),
    url:('/fonts/Gilroy-Bold.woff2') format('woff2')


.input-filter
  &:focus
    outline: 2px solid rgba(62, 151, 255, 0.32)
  &:active
    outline: 2px solid rgba(62, 151, 255, 0.32)
  &::placeholder
    font-size: 13px
    font-weight: 500
    color: #D8D8E5

.rotate
  transform: rotate(180deg)

.filter-buttons
  padding-top: 20px
  display: flex
  gap: 8px
  flex-wrap: wrap

  @media (max-width: 425px) and (min-width: 375px)
    padding-top: 12px
    padding-bottom: 12px
    margin-top: 62px

  @media (max-width: 375px)
    margin-top: 35px

  button
    display: flex
    align-items: center
    gap: 10px
    color: #2884EF
    background-color: #EEF6FF
    border-radius: 20px
    padding: 8px 14px
    font-size: 16px
    line-height: 16px
    font-weight: 500
    transition: background-color 0.2s ease

    @media (max-width: 425px) and (min-width: 375px)
      font-size: 14px
      line-height: 14px
      padding: 7px 14px
      padding-bottom: 7px

    &:hover
      background-color: #3E97FF33

    &.active
      background-color:  #3E97FF
      color: #FFFFFF

// Классы для адаптивной верстки с контрольными точками
.app-filter-container
  width: 100%

.app-filter-wrapper

  padding-left: 95px
  padding-right: 95px
  @media (max-width: 800px) and (min-width: 425px)
    padding-left: 30px
    padding-right: 30px
  @media (max-width: 425px) and (min-width: 375px)
    padding-left: 10px
    padding-right: 10px
    padding-top: 12px
    position: relative
    min-height: 98px

  @media (max-width: 375px)
    padding-left: 10px
    padding-right: 10px
    padding-top: 12px
    position: relative
    min-height: 98px

.app-filter-header
  display: flex
  align-items: center
  gap: 40px
  @media (max-width: 425px)

.app-filter-title
  font-size: 32px
  @media (max-width: 1400px) and (min-width: 425px)
    font-size: 32px
  @media (max-width: 425px) and (min-width: 375px)
    font-size: 24px
    line-height: 24px
  @media (max-width: 375px)
    font-size: 16px
    line-height: 16px

.app-filter-input-container
  width: 400px
  @media (max-width: 800px)
    width: 400px
  @media (max-width: 425px) and (min-width: 375px)
    position: absolute
    top: 46px
    width: 355px
  @media (max-width: 375px)
    position: absolute
    top: 46px
    width: auto
</style>
