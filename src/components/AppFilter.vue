<script lang="ts" setup>
import { ref, watch } from 'vue'
import store from '@/store'

const showFilters = ref(false)
const searchQuery = ref(store.searchQuery)
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
const selectedFilters = ref(store.selectedFilters)
const currentIcons = ref<Record<string, string>>({})

filters.value.forEach((filter) => {
  currentIcons.value[filter] = '/svg/plus.svg'
})

const isActiveFilter = (filter: string): boolean => {
  return selectedFilters.value.includes(filter)
}

const toggleFilterSelection = (filter: string): void => {
  const index = selectedFilters.value.indexOf(filter)

  if (index > -1) {
    selectedFilters.value.splice(index, 1)
  } else {
    selectedFilters.value.push(filter)
  }

  updateIcon(filter)
  store.selectedFilters = selectedFilters.value
}

const clearFilters = (): void => {
  selectedFilters.value = []
  store.selectedFilters = []
  searchQuery.value = ''
  store.searchQuery = ''
  resetAllIcons()
}

const toggleFilter = (): void => {
  showFilters.value = !showFilters.value
}

const clearSearch = (): void => {
  searchQuery.value = ''
}

const updateIcon = (filter: string): void => {
  currentIcons.value[filter] = isActiveFilter(filter) ? '/svg/cross.svg' : '/svg/plus.svg'
}

const resetAllIcons = (): void => {
  filters.value.forEach((filter) => {
    currentIcons.value[filter] = '/svg/plus.svg'
  })
}

watch([searchQuery, selectedFilters], ([newSearchQuery, newSelectedFilters]) => {
  store.searchQuery = newSearchQuery
  store.selectedFilters = newSelectedFilters
})
</script>

<template>
  <div class="w-full bg-white">
    <div class="app-filter-wrapper py-5" v-auto-animate>
      <div class="flex items-center gap-10">
        <h1 class="app-filter-title text-[32px] font-bold leading-8 text-[#181C32]">Блог</h1>
        <div class="app-filter-input-container relative flex items-center">
          <img src="/svg/search-icon.svg" class="absolute left-3" width="14px" height="14px" />
          <input
            v-model="searchQuery"
            class="input-filter h-[40px] w-full rounded-md bg-[#F9F9F9] px-[34px] py-[13px] text-sm"
            type="text"
            placeholder="Поиск"
            name="search-input"
          />
          <span
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute right-[10px] cursor-pointer text-[10px] text-gray-500"
          >
            &#10005;
          </span>
        </div>
        <div class="ml-auto flex">
          <button
            v-if="selectedFilters.length > 0"
            @click="clearFilters"
            class="mr-[10px] text-sm font-medium text-[#2884EF]"
          >
            Очистить
          </button>
          <button
            @click="toggleFilter"
            class="flex items-center gap-1 text-sm font-medium text-[#A1A5B7]"
          >
            {{ showFilters && selectedFilters.length === 0 ? 'Скрыть фильтр' : 'Фильтр' }}
            <img
              :class="{ 'rotate-180': showFilters }"
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
          @mouseenter="updateIcon(filter)"
          @mouseleave="updateIcon(filter)"
        >
          {{ filter }}
          <img :src="currentIcons[filter]" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.input-filter
  &:hover
    border: 1px solid #3E97FF
  &:focus
    border: 1px solid rgba(62, 151, 255, 1)
    outline: 2px solid rgba(62, 151, 255, 0.32)
  &::placeholder
    font-size: 13px
    font-weight: 500
    color: #D8D8E5

.filter-buttons
  padding-top: 20px
  display: flex
  gap: 8px
  flex-wrap: wrap

  @media (max-width: 425px)
    padding-top: 62px

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
    transition: background-color 0.5s ease

    &:hover
      background-color: #3E97FF33

    &.active
      background-color:  #3E97FF
      color: #FFFFFF

// adaptive classes
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

.app-filter-title
  font-size: 32px
  @media (max-width: 431px) and (min-width: 375px)
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
