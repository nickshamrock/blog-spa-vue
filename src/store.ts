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
      comments: 1,
      title: 'Вдохновение в каждом шаге',
      description: 'Наши путешественники находят вдохновение в каждом шаге своего пути.',
      tags: ['Природа', 'Люди'],
      text: 'Каждое утро, когда я просыпаюсь в палатке, окружённой лесом и горами, я чувствую, как природа наполняет меня энергией. Величественные вершины, покрытые зелёными лесами, напоминают мне о том, как важно сохранять связь с природой. Каждый шаг по тропе — это не просто движение вперёд, это путешествие внутрь себя, где я нахожу вдохновение и силу. В такие моменты я понимаю, что настоящая красота мира скрыта в его простоте и величии.'
    },

    {
      imageSrc: '/images/another-image-2.png',
      date: '6 Апр',
      readTime: '3 мин',
      comments: 5,
      title: 'Моменты тишины и покоя',
      description: 'В такие моменты наши фотографы ощущают гармонию и умиротворение.',
      tags: ['Природа', 'Животные'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },

    {
      imageSrc: '/images/image-3.png',
      date: '5 Апр',
      readTime: '3 мин',
      comments: 10,
      title: 'Объятия, которые говорят больше слов',
      description: 'В мире, где слова иногда теряют свою силу, объятия могут стать самым мощным...',
      tags: ['Природа', 'Искусство'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
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
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },

    {
      imageSrc: '/images/image-5.png',
      date: '3 Апр',
      readTime: '2 мин',
      comments: 2,
      title: 'Вкус лета',
      description: 'Напоминание о том, что простые удовольствия могут приносить огромное счастье.',
      tags: ['Природа', 'Искусство'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
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
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },

    {
      imageSrc: '/images/image-7.png',
      date: '5 Апр',
      readTime: '3 мин',
      comments: 10,
      title: 'Цвета природы в наших руках',
      description: 'Наши художники выражают всю красоту окружающего мира через творчество.',
      tags: ['Природа', 'Искусство'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },

    {
      imageSrc: '/images/image-8.png',
      date: '4 Апр',
      readTime: '15 мин',
      comments: 6,
      title: 'Семейные узы в дикой природе',
      description: 'Наблюдая за этими сценами, наши фотографы чувствуют тепло и единство..',
      tags: ['Природа', 'Животные'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
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
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },

    {
      imageSrc: '/images/image-10.png',
      date: '1 Апр',
      readTime: '4 мин',
      comments: 0,
      title: 'Моменты, которые остаются в сердце',
      description: 'Эти мгновения наполняют наши сердца радостью и любовью.',
      tags: ['Природа', 'Люди', 'Животные'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ] as Post[],
  selectedFilters: [] as string[],
  searchQuery: ''
})

export default store
