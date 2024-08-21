<script lang="ts" setup>
import { defineProps } from 'vue'

interface ModalWindowProps {
  show: boolean
}

defineProps<ModalWindowProps>()
</script>

<template>
  <div v-show="show" class="h-52 w-44 bg-slate-500">
    <p class="text-white">Это модальное окно</p>
    <button @click="$emit('close')">Закрыть окно</button>
  </div>
</template>
