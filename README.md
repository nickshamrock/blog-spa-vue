# Описание и логика проекта

Logoipsum – это корпоративный блог, в котором публикуются фотографии вымышленного сервиса. В этом блоге можно комментировать посты и сортировать их по конкретным фильтрам (“Природа”, “Люди” и так далее). Также на этом проекте реализован поиск постов по заголовку, описанию и тексту поста. Важно отметить, что при клике на пост открывается модальное окно, где есть секция с комментариями и описанием фотографии.

# Важно!

Проект верстался по [макету](https://www.figma.com/design/KBXO6PxmM53y0KODPwDMlP/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5?node-id=4-196&node-type=frame&t=dYTubLQH9rQx7M53-0)

Из-за этого вы заметите противоречия по количеству комментариев к постам: кликаете на него, а в модальном окне всего 1, хотя заявлено больше. Увы, это не учитано в макете (как и неподходящие теги к постам). Тем не менее, если вы добавите новый комментарий, то их количество динамически поменяется. Безусловно, этот момент легко пофиксить. Но важно было показать строгое соответствие макету и согласование числа со словом "комментариев"

Проект реализован без серверной части также в рамках ТЗ. Для его масштабирования придется изменить логику фильтрации. Основная цель проекта - показать возможности фильтрации и отображения постов, реализовать модальное окно и продемонстрировать навыки frontend-разработки

# Используемые технологии

Блог Logoipsum написан на Vue 3 (Composition API) с поддержкой TypeScript. Помимо этого, в проекте используются и другие библиотеки/плагины. Проект собран на Vite с помощью create vue@latest

Стек технологий/плагинов/технологий:

- для кода: TypeScript с поддержкой vue-tsc(2.0.21). Документация Vue рекомендует использовать эту утилиту-обертку для проверки типов в командной строке, генерации объявлений типов и другого;
- для стилей CSS: Tailwind (в большинстве случаев) и препроцессор SASS для отдельных случаев;
  для анимации используется библиотека AutoAnimate помимо дефолтной анимации из “коробки” Vue 3 (Transition);
- фреймворк Vue 3 (3.4.29);
- сборщик Vite (5.3.1);
- форматирование и проверка кода eslint(8.57.0), eslint-plugin-vue (9.23.0) и prettier(3.3.3);
- помимо этого для упорядочивания инлайновых-стилей Tailwind используется плагин prettier-plugin-tailwindcss (0.6.6)

Полный список зависимостей, технологий и плагинов с версиями доступен в файле package.json

# Как установить проект

Рекомендуем разворачивать проект на VSCode с расширением Volar. Также советуем отключить Vetur, если вы используете его, поскольку это расширение может конфликтовать с TypeScript. Используйте пакетный менеджер npm.

Если вам нужно кастомизировать конфигурацию Vite, следуйте документации

1. Скачайте репозиторий с GitHub
2. Установите зависимости через команду в терминале

```sh
npm install
```

3. Чтобы открыть проект в браузере, введите следующую команду

```sh
npm run dev
```

4. И перейдите на указанный localhost. Вам должен открыться проект.
