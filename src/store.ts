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
      imageSrc: '/images/image-1.png',
      date: '9 Апр',
      readTime: '2 мин',
      comments: 1, //сделать динамическое обновление этого ключа
      title: 'Вдохновение в каждом шаге',
      description: 'Наши путешественники находят вдохновение в каждом шаге своего пути.',
      tags: ['Природа', 'Люди'],
      text: 'Lorem ipsum'
    },

    {
      imageSrc: '/images/another-image-2.png',
      date: '6 Апр',
      readTime: '3 мин',
      comments: 5,
      title: 'Моменты тишины и покоя',
      description: 'В такие моменты наши фотографы ощущают гармонию и умиротворение.',
      tags: ['Природа', 'Животные'],
      text: 'Lorem Ipsum Test Text'
    },

    {
      imageSrc: '/images/image-3.png',
      date: '5 Апр',
      readTime: '3 мин',
      comments: 10,
      title: 'Объятия, которые говорят больше слов',
      description: 'В мире, где слова иногда теряют свою силу, объятия могут стать самым мощным...',
      tags: ['Природа', 'Искусство'],
      text: 'Lorem Ipsum Test Text'
    },

    {
      imageSrc: '/images/image-4.png',
      date: '4 Апр',
      readTime: '15 мин',
      comments: 6,
      title: 'Вечная гармония',
      description:
        'Фреска с божествами, словно окно в иной мир, где царит вечная гармония и покой.',
      tags: ['Природа', 'Животные'],
      text: 'Lorem Ipsum Test Text'
    },

    {
      imageSrc: '/images/image-5.png',
      date: '3 Апр',
      readTime: '2 мин',
      comments: 2,
      title: 'Вкус лета',
      description: 'Напоминание о том, что простые удовольствия могут приносить огромное счастье.',
      tags: ['Природа', 'Искусство'],
      text: 'Lorem Ipsum Test Text'
    },

    {
      imageSrc: '/images/image-6.png',
      date: '1 Апр',
      readTime: '4 мин',
      comments: 0,
      title: 'Эхо прошлого',
      description:
        'Старинное здание, укрытое под кронами деревьев, словно хранит в себе эхо прошлого.',
      tags: ['Природа', 'Люди', 'Животные'],
      text: 'Lorem Ipsum Test Text'
    },

    {
      imageSrc: '/images/image-7.png',
      date: '5 Апр',
      readTime: '3 мин',
      comments: 10,
      title: 'Цвета природы в наших руках',
      description: 'Наши художники выражают всю красоту окружающего мира через творчество.',
      tags: ['Природа', 'Искусство'],
      text: 'Lorem Ipsum Test Text'
    },

    {
      imageSrc: '/images/image-8.png',
      date: '4 Апр',
      readTime: '15 мин',
      comments: 6,
      title: 'Семейные узы в дикой природе',
      description: 'Наблюдая за этими сценами, наши фотографы чувствуют тепло и единство..',
      tags: ['Природа', 'Животные'],
      text: 'Lorem Ipsum Test Text'
    },

    {
      imageSrc: '/images/image-9.png',
      date: '3 Апр',
      readTime: '2 мин',
      comments: 2,
      title: 'Гармония городских и природных пейзажей',
      description:
        'Этот вид напоминает нам о том, как природа и город могут сосуществовать в гармонии.',
      tags: ['Природа', 'Искусство'],
      text: 'Lorem Ipsum Test Text'
    },

    {
      imageSrc: '/images/image-10.png',
      date: '1 Апр',
      readTime: '4 мин',
      comments: 0,
      title: 'Моменты, которые остаются в сердце',
      description: 'Эти мгновения наполняют наши сердца радостью и любовью.',
      tags: ['Природа', 'Люди', 'Животные'],
      text: 'Lorem Ipsum Test Text'
    }

    // добавьте остальные посты здесь
  ] as Post[],
  selectedFilters: [] as string[],
  searchQuery: ''
})

export default store
