<script lang="ts" setup>
import { ref, defineEmits, defineProps } from 'vue'

const emit = defineEmits(['update:searchQuery'])
const props = defineProps<{ searchQuery: string }>()

const localSearchQuery = ref(props.searchQuery)

const updateSearch = () => {
  emit('update:searchQuery', localSearchQuery.value)
}

const clearSearch = () => {
  localSearchQuery.value = ''
  updateSearch()
}
</script>

<template>
  <div class="app-filter-input-container relative flex items-center">
    <img src="/svg/search-icon.svg" class="absolute left-3" width="14px" height="14px" />
    <input
      v-model="localSearchQuery"
      class="input-filter h-[40px] w-full rounded-md bg-[#F9F9F9] px-[34px] py-[13px] text-sm"
      type="text"
      placeholder="Поиск"
      name="search-input"
      @input="updateSearch"
    />
    <span
      v-if="localSearchQuery"
      @click="clearSearch"
      class="absolute right-[10px] cursor-pointer text-[10px] text-gray-500"
    >
      &#10005;
    </span>
  </div>
</template>

<style lang="sass" scoped>

.input-filter
  &:hover
    border: 1px solid #3e97ff

  &:focus
    border: 1px solid rgba(62, 151, 255, 1)
    outline: 2px solid rgba(62, 151, 255, 0.32)

  &::placeholder
    font-size: 13px
    font-weight: 500
    color: #d8d8e5

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
