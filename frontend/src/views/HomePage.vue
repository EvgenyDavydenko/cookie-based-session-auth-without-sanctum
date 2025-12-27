<script setup>
import { onMounted } from 'vue'
import useAuth from '../composables/useAuth'

const { user, getUser } = useAuth()

onMounted(async () => {
  if (!user.value) {
    await getUser()
  }
})
</script>

<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="display-4 fw-bold text-primary mb-3">Мой Блог</h1>

        <p class="lead text-muted">
          <template v-if="user">
            Добро пожаловать, <strong>{{ user.name }}</strong> 👋
          </template>
          <template v-else>
            Добро пожаловать, <strong>гость</strong> 👋
          </template>
        </p>
      </div>
    </div>
  </div>
</template>