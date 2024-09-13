<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import IconButton from '../ui-components/IconButton.vue'

const emit = defineEmits(['update:selectedFilters'])
const props = defineProps<{
  filters: string[]
  selectedFilters: string[]
}>()

const toggleFilter = (filter: string) => {
  emit('update:selectedFilters', filter)
}

const isActive = (filter: string) => {
  return props.selectedFilters.includes(filter)
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

      <IconButton :isActive="isActive(filter)" />
    </button>
  </div>
</template>

<style lang="sass" scoped>

.filter-buttons
    padding-top: 20px
    @media (max-width: 425px)
      padding-top: 65px

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
