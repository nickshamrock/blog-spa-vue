<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'

const emit = defineEmits(['update:selectedFilters'])
const props = defineProps<{
  filters: string[]
  selectedFilters: string[]
}>()

const icons = ref<Record<string, string>>({})
props.filters.forEach((filter) => {
  icons.value[filter] = '/svg/plus.svg'
})

const toggleFilter = (filter: string) => {
  emit('update:selectedFilters', filter)
  updateIcon(filter)
}

const isActive = (filter: string) => {
  return props.selectedFilters.includes(filter)
}

const updateIcon = (filter: string) => {
  icons.value[filter] = isActive(filter) ? '/svg/cross.svg' : '/svg/plus.svg'
}
</script>

<template>
  <div class="filter-buttons flex flex-wrap gap-2">
    <button
      v-for="filter in filters"
      :key="filter"
      @click="toggleFilter(filter)"
      :class="{ active: isActive(filter) }"
    >
      {{ filter }}
      <img :src="icons[filter]" />
    </button>
  </div>
</template>

<style lang="sass" scoped>

.filter-buttons
    padding-top: 20px

button
    display: flex
    align-items: center
    gap: 10px
    color: #2884ef
    background-color: #eef6ff
    border-radius: 20px
    padding: 8px 14px
    font-size: 16px
    line-height: 16px
    font-weight: 500
    transition: background-color 0.5s ease

    &:hover
      background-color: #3e97ff33


    &.active
      background-color: #3e97ff
      color: #ffffff
</style>
