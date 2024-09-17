<script lang="ts" setup>
import { ref, watch } from 'vue'
import store from '@/store'
import AppSearchInput from './filter-components/AppSearchInput.vue'
import AppButtonsFilters from './filter-components/AppButtonsFilters.vue'
import AppToggleButtons from './filter-components/AppToggleButtons.vue'

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
          class="text-[32px] font-bold leading-8 text-[#181C32] max-[435px]:text-2xl max-[435px]:leading-6"
        >
          Блог
        </h1>

        <AppSearchInput :searchQuery="searchQuery" @update:searchQuery="updateSearchQuery" />

        <div class="ml-auto flex">
          <AppToggleButtons
            :selectedFilters="selectedFilters"
            :showFilters="showFilters"
            @clearFilters="clearFilters"
            @toggleFilter="toggleFilter"
          />
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

<style lang="sass" scoped>

.app-filter-wrapper
  padding-left: 95px
  padding-right: 95px

  @media (max-width: 800px) and (min-width: 425px)
    padding-left: 30px
    padding-right: 30px
  @media (max-width: 435px)
    padding-left: 10px
    padding-right: 10px
    padding-top: 12px
    position: relative
    min-height: 98px
</style>
