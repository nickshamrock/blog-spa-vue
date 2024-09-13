<script setup lang="ts">
import CrossIcon from './CrossIcon.vue'
import PlusIcon from './PlusIcon.vue'

const props = defineProps<{
  isActive: boolean
}>()
</script>

<template>
  <div v-if="!props.isActive">
    <PlusIcon />
  </div>
  <div v-else>
    <CrossIcon />
  </div>
</template>
