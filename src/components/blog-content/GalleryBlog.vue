<script lang="ts" setup>
import { computed } from 'vue'
import BlogPost from './BlogPost.vue'
import SearchFail from './SearchFail.vue'
import store from '@/store'
import { parseDate } from '@/utils/FilterPostsByDate'

const matchesFilters = (post: any): boolean => {
  return (
    store.selectedFilters.length === 0 ||
    post.tags.some((tag: string) => store.selectedFilters.includes(tag))
  )
}

const matchesSearchQuery = (post: any): boolean => {
  const query = store.searchQuery.toLowerCase()
  return post.description.toLowerCase().includes(query) || post.text.toLowerCase().includes(query)
}

const filteredPosts = computed(() => {
  return store.posts
    .filter((post) => matchesFilters(post) && matchesSearchQuery(post))
    .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
    .slice(0, 6)
})

const showNoResults = computed(() => filteredPosts.value.length === 0)
</script>

<template>
  <section
    class="w-full bg-[#F1F1F2] px-[50px] pb-[30px] pt-5 max-[980px]:px-[10px] max-[980px]:pt-[10px]"
  >
    <div v-if="showNoResults">
      <SearchFail />
    </div>

    <div
      v-else
      class="flex flex-wrap gap-5 rounded-xl bg-white p-[30px] max-[980px]:p-[5px]"
      v-auto-animate
    >
      <BlogPost
        v-for="post in filteredPosts"
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
  </section>
</template>
