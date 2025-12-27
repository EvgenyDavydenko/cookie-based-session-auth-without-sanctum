## Laravel12 Vue3 создание ws чата с Cookie-аутентификацией на основе сессий с защитой CSRF-токеном

0. Поднять контейнеры
```
mkdir frontend backend
docker compose up -d --build
```
1.  Creating a Laravel Project
```
docker exec -it --user www-data nginx-phpfpm bash
composer create-project laravel/laravel ./
php artisan config:publish cors
```
2.  Creating a Vue Application with Vue-Router, Axios and Bootstrap CSS
```
docker exec -it nodejs-bookworm bash
npm create vue@latest
npm install
npm i vue-router
npm i axios
npm i bootstrap@5.3.8
```
4.  Настроить подключение к БД в .env
5.  Реализация аутентификации на сервере
6.  Реализация аутентификации на клиенте
7.  Перезапустить контейнер со стартом фронтенда и миграциями

8. Install Reverb
```
php artisan install:broadcasting
npm i laravel-echo
npm i pusher-js
```
9.  Реализация простого сокет взаимодействия
10. Реализация логики интерактивного чата двух собеседников