<script setup>
import useAuth from '../composables/useAuth'

const { user } = useAuth()
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-4">
        <h2 class="text-center">Профиль пользователя</h2>

        <div v-if="!user" class="alert alert-info d-flex align-items-center">
          <div class="spinner-border spinner-border-sm me-3" role="status"></div>
          <div>Загрузка данных профиля...</div>
        </div>

        <div v-else class="card shadow">
          <div class="card-body p-4">
            <p class="fs-5 mb-5">Добро пожаловать, {{ user.name }}</p>
            <p class="fs-5 mb-0">Email: {{ user.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>