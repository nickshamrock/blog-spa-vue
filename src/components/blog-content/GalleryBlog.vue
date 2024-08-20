<script lang="ts" setup>
import CardItem from './CardItem.vue'
</script>
<template>
  <div class="flex h-[950px] w-full flex-col gap-10 rounded-xl bg-black/70 p-[30px]">
    <div class="flex h-[408px] w-full gap-5 outline outline-2 outline-cyan-50">
      <CardItem
        imageSrc="http://placehold.it/400x250"
        date="6 Апр"
        readTime="3 мин"
        :comments="5"
        title="Моменты тишины и покоя"
        description="В такие моменты наши фотографы ощущают гармонию и умиротворение."
        :tags="['Природа', 'Животные']"
      />
      <CardItem
        imageSrc="http://placehold.it/400x250"
        date="6 Апр"
        readTime="3 мин"
        :comments="5"
        title="Моменты тишины и покоя"
        description="В такие моменты наши фотографы ощущают гармонию и умиротворение."
        :tags="['Природа', 'Животные']"
      />
      <CardItem
        imageSrc="http://placehold.it/400x250"
        date="6 Апр"
        readTime="3 мин"
        :comments="5"
        title="Моменты тишины и покоя"
        description="В такие моменты наши фотографы ощущают гармонию и умиротворение."
        :tags="['Природа', 'Животные']"
      />
    </div>
    <div class="flex h-[408px] w-full gap-5 outline outline-2 outline-cyan-50">
      <CardItem
        imageSrc="http://placehold.it/400x250"
        date="6 Апр"
        readTime="3 мин"
        :comments="5"
        title="Моменты тишины и покоя"
        description="В такие моменты наши фотографы ощущают гармонию и умиротворение."
        :tags="['Природа', 'Животные']"
      />
      <CardItem
        imageSrc="http://placehold.it/400x250"
        date="6 Апр"
        readTime="3 мин"
        :comments="5"
        title="Моменты тишины и покоя"
        description="В такие моменты наши фотографы ощущают гармонию и умиротворение."
        :tags="['Природа', 'Животные']"
      />
      <CardItem
        imageSrc="http://placehold.it/400x250"
        date="6 Апр"
        readTime="3 мин"
        :comments="5"
        title="Моменты тишины и покоя"
        description="В такие моменты наши фотографы ощущают гармонию и умиротворение."
        :tags="['Природа', 'Животные']"
      />
    </div>
  </div>
</template>
