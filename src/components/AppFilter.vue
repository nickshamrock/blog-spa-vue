<script lang="ts" setup>
import { ref, watch } from 'vue'
import store from '@/store'
import AppSearchInput from './AppSearchInput.vue'
import AppButtonsFilters from './AppButtonsFilters.vue'

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

const toggleFilterSelection = (filter: string): void => {
  const index = selectedFilters.value.indexOf(filter)
  if (index > -1) {
    selectedFilters.value.splice(index, 1)
  } else {
    selectedFilters.value.push(filter)
  }
  store.selectedFilters = selectedFilters.value
}

const updateSearchQuery = (newSearchQuery: string): void => {
  searchQuery.value = newSearchQuery
  store.searchQuery = newSearchQuery
}

const clearFilters = (): void => {
  selectedFilters.value = []
  store.selectedFilters = []
  searchQuery.value = ''
  store.searchQuery = ''
}

const toggleFilter = (): void => {
  showFilters.value = !showFilters.value
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
        <h1
          class="text-[32px] font-bold leading-8 text-[#181C32] max-[431px]:text-2xl max-[431px]:leading-6"
        >
          Блог
        </h1>

        <AppSearchInput :searchQuery="searchQuery" @update:searchQuery="updateSearchQuery" />

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

      <div v-if="showFilters">
        <AppButtonsFilters
          :filters="filters"
          :selectedFilters="selectedFilters"
          @update:selectedFilters="toggleFilterSelection"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

// adaptive classes
.app-filter-wrapper
  padding-left: 95px
  padding-right: 95px

  @media (max-width: 800px) and (min-width: 425px)
    padding-left: 30px
    padding-right: 30px
  @media (max-width: 425px)
    padding-left: 10px
    padding-right: 10px
    padding-top: 12px
    position: relative
    min-height: 98px

.app-filter-input-container
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
