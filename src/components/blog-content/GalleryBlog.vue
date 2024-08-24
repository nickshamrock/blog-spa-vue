<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import BlogPost from './BlogPost.vue'
import store from '@/store'

// Функция для преобразования даты в формат, пригодный для сортировки
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

const chunkSize = ref(3) //Количество постов в строке

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

// Разделение постов на чанки-посты для отображения
const chunkedPosts = computed(() => {
  const posts = filteredPosts.value
  const chunks: any[][] = []
  for (let i = 0; i < posts.length; i += chunkSize.value) {
    chunks.push(posts.slice(i, i + chunkSize.value))
  }
  return chunks
})

/* Фунция показа заглушки, если нет постов, соответствующих фильтрам и поисковому запросу */
const showNoResults = computed(() => filteredPosts.value.length === 0)

//функция, которая высчитывает количество постов-чанков в строке в зависимости от размера окна
onMounted(() => {
  const updateChunkSize = () => {
    if (window.innerWidth <= 430) {
      chunkSize.value = 1 // Один пост в строке на узких экранах
    } else if (window.innerWidth <= 800) {
      chunkSize.value = 2 // Два поста в строке на средних экранах
    } else {
      chunkSize.value = 3 // Три поста в строке на широких экранах
    }
  }

  window.addEventListener('resize', updateChunkSize)
  updateChunkSize()
})
</script>

<template>
  <!--Если нет совпадений, показываем текст-заглушку -->
  <section
    class="bg-[#F1F1F2] px-[50px] pb-[30px] pt-5 max-[800px]:px-[10px] max-[800px]:pt-[10px]"
  >
    <div v-if="showNoResults" class="flex h-full w-full items-center justify-center">
      <p class="text-7xl text-white">Увы, ничего не нашлось! Сочувствуем вам</p>
    </div>
    <!-- Иначе показываем посты -->
    <div
      v-else
      class="flex h-auto w-full flex-col flex-wrap rounded-xl bg-white p-[30px] max-[800px]:p-[15px]"
    >
      <div
        v-for="(chunk, index) in chunkedPosts"
        :key="index"
        class="mb-10 flex h-auto w-full gap-5 max-[800px]:mb-[25px]"
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
          :text="post.text"
        />
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped></style>
