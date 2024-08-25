<script lang="ts" setup></script>

<template>
  <div class="h-full w-full bg-white">
    <div class="m-auto flex w-full max-w-80 flex-col items-center p-5">
      <img
        src="/public/svg/search-list.svg"
        class="mb-2 block"
        width="46"
        height="46"
        alt="Нет результатов поиска"
      />
      <p class="mb-1 text-sm font-medium leading-[14px] text-[#7E8299]">Поиск не дал результатов</p>
      <p class="text-center text-xs font-medium leading-5 text-[#A1A5B7]">
        Повторите поиск или используйте фильтр для структуризации контента
      </p>
    </div>
  </div>
</template>
