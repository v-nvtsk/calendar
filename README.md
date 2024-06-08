# Календарь событий с авторизацией

[![Lint and Test](https://github.com/v-nvtsk/calendar/actions/workflows/lint-test.yaml/badge.svg)](https://github.com/v-nvtsk/calendar/actions/workflows/lint-test.yaml)
![Coverage Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Fv-nvtsk%2Ff9b687636482339cabd6a8c4b369f3eb%2Fraw%2F2d48f3578326dcf4ad8604c2198f0f9e146cd6d2%2Fcalendar-junit-tests.json)
[![Playwright Tests](https://github.com/v-nvtsk/calendar/actions/workflows/playwright.yml/badge.svg)](https://github.com/v-nvtsk/calendar/actions/workflows/playwright.yml)
[![Deploy to GithubPages](https://github.com/v-nvtsk/calendar/actions/workflows/deploy-gh-pages.yaml/badge.svg)](https://github.com/v-nvtsk/calendar/actions/workflows/deploy-gh-pages.yaml)
![GitHub repo size](https://img.shields.io/github/repo-size/v-nvtsk/calendar)

![Static Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Static Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Static Badge](https://img.shields.io/badge/firebase-orange?style=for-the-badge&logo=FIREBASE&logoColor=white)

> Приложение для создания и контроля событий в календаре

---

## Локальный запуск

После выполнения команды приложение будет доступно по адресу: http://localhost:3000

```sh
npm install
npm start
```

Возможна регистрация новых пользователей по email и паролю. Адрес электронной почты можно изменить после логина.

Все представления позволяют:

- создавать, редактировать, удалять задачи (заголовок, описание, статус выполнения, дата)
- фильтровать по статусу выполнения, дате, тексту в названии и в описании, тегам

Варианты страниц календаря:  
Вид года:  
![alt text](year-view.png.jpg)

Вид Месяца:  
![alt text](month-view.png.jpg)

Вид недели:  
![alt text](week-view.png.jpg)

Вид дня:  
![alt text](day-view.png.jpg)

Список дел:  
![alt text](task-list.png.jpg)

Добавление и фильтрация в боковой панели  
 ![alt text](sidepanel.png.jpg)

## TODO

- Не учитывается продолжительность события
- Не разделены объекты: событие и задача
- База данных не позволяет хранить даты, приходится хранить в number
- База данных не позволяет искать по тексту в полях
- Заголовки окна при переходах между страницами - обновляются неадекватно

- Недоработан алгоритм отображения списка:  
  отображаются задачи с сегодняшнего дня и далее.  
  чтобы отобразить предшествующие дни надо выставить фильтр

- сделать [fuzzy search](https://whatis.techtarget.com/definition/fuzzy-search) (можно взять [`Fuzzy search`](https://www.npmjs.com/package/fuzzy-search))
- состояние должно отображаться на url (чтобы его можно было сохранять в закладки)
