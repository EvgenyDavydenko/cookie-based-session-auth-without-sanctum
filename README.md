## Laravel12 Vue3 пример Cookie-аутентификации на основе сессий с защитой CSRF-токеном без использования Sanctum

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
