<template>
  <div class="blog-filter">
    <div class="search-container">
      <h1>Блог</h1>
      <input v-model="searchQuery" type="text" placeholder="Поиск" />
      <div class="button-group">
        <button v-if="selectedFilters.length > 0" @click="clearFilters" class="clear-button">
          Очистить
        </button>
        <button @click="toggleFilter" class="filter-toggle">
          {{ showFilters && selectedFilters.length === 0 ? 'Скрыть фильтры' : 'Фильтр' }}
          <span :class="{ rotate: showFilters }" class="arrow">▼</span>
        </button>
      </div>
    </div>

    <div v-if="showFilters" class="filter-buttons">
      <button
        v-for="filter in filters"
        :key="filter"
        @click="toggleFilterSelection(filter)"
        :class="{ active: isActiveFilter(filter) }"
      >
        {{ filter }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import store from '@/store'

const showFilters = ref<boolean>(false)
const searchQuery = ref<string>(store.searchQuery)
const filters = ref<string[]>([
  'Город +',
  'Природа +',
  'Люди +',
  'Животные +',
  'Еда +',
  'Напитки +',
  'Архитектура +',
  'Искусство +'
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
</script>

<style scoped lang="sass">
.blog-filter
  .search-container
    display: flex
    align-items: center

    h1
      margin: 0
      font-size: 24px
      font-weight: bold

    input
      margin-left: 10px
      padding: 5px
      border: 1px solid #ddd
      border-radius: 4px
      font-size: 14px
      width: 200px

    .button-group
      display: flex
      align-items: center
      margin-left: auto

    .clear-button
      background: none
      border: none
      color: #000
      font-size: 14px
      cursor: pointer
      margin-right: 10px

    .filter-toggle
      display: flex
      align-items: center
      background: none
      border: none
      color: #000
      font-size: 14px
      cursor: pointer

    .arrow
      margin-left: 5px
      transition: transform 0.2s ease

    .rotate
      transform: rotate(180deg)

  .filter-buttons
    margin-top: 10px

    button
      background-color: #f0f8ff
      border: 1px solid #87cefa
      border-radius: 20px
      padding: 5px 10px
      margin-right: 5px
      font-size: 14px
      color: #000
      cursor: pointer
      transition: background-color 0.2s ease

      &:hover
        background-color: #e0f0ff

      &.active
        background-color: red   // Изменение цвета кнопки при активации
        border-color: red      // Цвет границы при активации
        color: red
</style>
