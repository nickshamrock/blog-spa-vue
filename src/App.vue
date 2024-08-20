<script lang="ts" setup>
import AppHeader from './components/AppHeader.vue'
import AppFilter from './components/AppFilter.vue'
import GalleryBlog from './components/blog-content/GalleryBlog.vue'
</script>

<template>
  <app-header></app-header>
  <app-filter></app-filter>
  <section class="bg-slate-500 px-[50px] pb-[30px] pt-5">
    <gallery-blog></gallery-blog>
  </section>
</template>

<style lang="sass" scoped></style>
