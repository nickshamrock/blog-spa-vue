import { reactive } from 'vue'

interface Post {
  imageSrc: string
  date: string
  readTime: string
  comments: number
  title: string
  description: string
  tags: string[]
}

const store = reactive({
  posts: [
    {
      imageSrc: 'http://placehold.it/400x250',
      date: '6 Апр',
      readTime: '3 мин',
      comments: 5,
      title: 'Моменты тишины и покоя',
      description: 'В такие моменты наши фотографы ощущают гармонию и умиротворение.',
      tags: ['Природа', 'Животные']
    }
    // добавьте остальные посты здесь
  ] as Post[],
  selectedFilters: [] as string[],
  searchQuery: ''
})

export default store
