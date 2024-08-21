<script lang="ts" setup>
import { computed } from 'vue'
import BlogPost from './BlogPost.vue'
import store from '@/store'

// Добавил сейчас: Функция для преобразования даты в формат, который можно использовать для сортировки
function parseDate(dateString: string): Date {
  const [day, month] = dateString.split(' ')
  const monthMap: { [key: string]: number } = {
    Янв: 0,
    Фев: 1,
    Мар: 2,
    Апр: 3,
    Май: 4,
    Июн: 5,
    Июл: 6,
    Авг: 7,
    Сен: 8,
    Окт: 9,
    Ноя: 10,
    Дек: 11
  }
  return new Date(new Date().getFullYear(), monthMap[month], parseInt(day, 10))
}

const chunkSize = 3

// Вычисляем только те посты, которые соответствуют выбранным фильтрам и запросу поиска
const filteredPosts = computed(() => {
  return store.posts
    .filter((post) => {
      const matchesFilters =
        store.selectedFilters.length === 0 ||
        post.tags.some((tag) => store.selectedFilters.includes(tag))
      const matchesSearch = post.description.toLowerCase().includes(store.searchQuery.toLowerCase())
      return matchesFilters && matchesSearch
    })
    .slice(0, 6)
    .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()) //эти функции ограничивают показ колчичества постов
  //до 6 и при этом фильтруют по дате от нового к старому
})

// Разделение постов на чанки для отображения
const chunkedPosts = computed(() => {
  const posts = filteredPosts.value
  const chunks: any[][] = []
  for (let i = 0; i < posts.length; i += chunkSize) {
    chunks.push(posts.slice(i, i + chunkSize))
  }
  return chunks
})

/* Добавлено: Компонент отображает заглушку, если нет постов, соответствующих фильтрам и поисковому запросу */
const showNoResults = computed(() => filteredPosts.value.length === 0)
</script>

<template>
  <!-- Добавлено: если нет совпадений, показываем текст-заглушку -->
  <div v-if="showNoResults" class="flex h-full w-full items-center justify-center">
    <p class="text-7xl text-white">Увы, ничего не нашлось! Сочувствуем вам</p>
  </div>

  <!-- Иначе показываем посты -->
  <div v-else class="flex h-[950px] w-full flex-col gap-10 rounded-xl bg-black/70 p-[30px]">
    <div
      v-for="(chunk, index) in chunkedPosts"
      :key="index"
      class="flex h-[408px] w-full gap-5 outline outline-2 outline-cyan-50"
    >
      <BlogPost
        v-for="post in chunk"
        :key="post.title"
        :imageSrc="post.imageSrc"
        :date="post.date"
        :readTime="post.readTime"
        :comments="post.comments"
        :title="post.title"
        :description="post.description"
        :tags="post.tags"
      />
    </div>
  </div>
</template>
