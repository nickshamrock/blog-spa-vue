import { reactive } from 'vue'

interface Post {
  imageSrc: string
  date: string
  readTime: string
  comments: number
  title: string
  description: string
  tags: string[]
  text: string
}

const store = reactive({
  posts: [
    {
      imageSrc: 'http://placehold.it/400x250',
      date: '9 Апр',
      readTime: '2 мин',
      comments: 1, //сделать динамическое обновление этого ключа
      title: 'Вдохновение в каждом шаге',
      description: 'Наши путешественники находят вдохновение в каждом шаге своего пути.',
      tags: ['Природа', 'Люди'],
      text: 'Lorem ipsum'
    },

    {
      imageSrc: 'http://placehold.it/400x250',
      date: '6 Апр',
      readTime: '3 мин',
      comments: 5,
      title: 'Объятия, которые говорят больше слов',
      description: 'В такие моменты наши фотографы ощущают гармонию и умиротворение.',
      tags: ['Природа', 'Животные'],
      text: 'Lorem Ipsum Test Text'
    },

    {
      imageSrc: 'http://placehold.it/400x250',
      date: '5 Апр',
      readTime: '3 мин',
      comments: 5,
      title: 'Моменты тишины и покоя',
      description: 'В такие моменты наши фотографы ощущают гармонию и умиротворение.',
      tags: ['Природа', 'Искусство'],
      text: 'Lorem Ipsum Test Text'
    },

    {
      imageSrc: 'http://placehold.it/400x250',
      date: '4 Апр',
      readTime: '3 мин',
      comments: 5,
      title: 'Моменты тишины и покоя',
      description: 'В такие моменты наши фотографы ощущают гармонию и умиротворение.',
      tags: ['Природа', 'Животные'],
      text: 'Lorem Ipsum Test Text'
    },

    {
      imageSrc: 'http://placehold.it/400x250',
      date: '3 Апр',
      readTime: '3 мин',
      comments: 5,
      title: 'Моменты тишины и покоя',
      description: 'В такие моменты наши фотографы ощущают гармонию и умиротворение.',
      tags: ['Природа', 'Животные'],
      text: 'Lorem Ipsum Test Text'
    },

    {
      imageSrc: 'http://placehold.it/400x250',
      date: '1 Апр',
      readTime: '3 мин',
      comments: 5,
      title: 'Моменты тишины и покоя',
      description: 'В такие моменты наши фотографы ощущают гармонию и умиротворение.',
      tags: ['Природа', 'Животные'],
      text: 'Lorem Ipsum Test Text'
    },

    {
      imageSrc: 'http://placehold.it/400x250',
      date: '6 Апр',
      readTime: '3 мин',
      comments: 5,
      title: 'Моменты тишины и покоя',
      description: 'В такие моменты наши фотографы ощущают гармонию и умиротворение.',
      tags: ['Природа', 'Животные'],
      text: 'Lorem Ipsum Test Text'
    },

    {
      imageSrc: 'http://placehold.it/400x250',
      date: '6 Апр',
      readTime: '3 мин',
      comments: 5,
      title: 'Моменты тишины и покоя',
      description: 'В такие моменты наши фотографы ощущают гармонию и умиротворение.',
      tags: ['Природа', 'Животные'],
      text: 'Lorem Ipsum Test Text'
    },

    {
      imageSrc: 'http://placehold.it/400x250',
      date: '6 Апр',
      readTime: '3 мин',
      comments: 5,
      title: 'Моменты тишины и покоя',
      description: 'В такие моменты наши фотографы ощущают гармонию и умиротворение.',
      tags: ['Природа', 'Животные'],
      text: 'Lorem Ipsum Test Text'
    }

    // добавьте остальные посты здесь
  ] as Post[],
  selectedFilters: [] as string[],
  searchQuery: ''
})

export default store
