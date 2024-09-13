<script lang="ts" setup>
defineProps<{
  selectedFilters: string[]
  showFilters: boolean
}>()

const emit = defineEmits<{
  (e: 'clearFilters'): void
  (e: 'toggleFilter'): void
}>()

const clearFilters = () => {
  emit('clearFilters')
}

const toggleFilter = () => {
  emit('toggleFilter')
}
</script>

<template>
  <button
    v-if="selectedFilters.length > 0"
    @click="clearFilters"
    class="mr-[10px] text-sm font-medium text-[#2884EF]"
  >
    Очистить
  </button>
  <button @click="toggleFilter" class="flex items-center gap-1 text-sm font-medium text-[#A1A5B7]">
    {{ showFilters && selectedFilters.length === 0 ? 'Скрыть фильтр' : 'Фильтр' }}
    <img :class="{ 'rotate-180': showFilters }" src="/svg/arrow.svg" width="10px" height="6px" />
  </button>
</template>
