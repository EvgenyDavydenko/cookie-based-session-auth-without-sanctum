<script setup>
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'

const router = useRouter()
const { user, logout } = useAuth()

const handleLogout = async () => {
  await logout()
  router.push('/login')
}
</script>

<template>
  <div class="mt-4 px-4">
    <nav class="navbar bg-dark rounded">
      <div class="container">
        <!-- Левая часть навигации -->
        <div class="d-flex">
          <router-link class="nav-link text-light me-4 link-warning" to="/home">Домой</router-link>
          <router-link class="nav-link text-light me-4 link-warning" to="/profile">Профиль</router-link>
          <router-link class="nav-link text-light link-warning" to="/login">Вход</router-link>
        </div>

        <!-- Правая часть навигации -->
        <div class="d-flex align-items-center">
          <span v-if="user" class="text-light me-4">Добро пожаловать, {{ user.name }}</span>
          <button v-if="user" @click="handleLogout" class="btn btn-outline-light btn-sm">Выйти</button>
        </div>
      </div>
    </nav>
  </div>
</template>