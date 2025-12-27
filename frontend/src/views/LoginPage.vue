<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'

const router = useRouter()
const { login, errorMessage, isLoading, validationErrors } = useAuth()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const ok = await login(email.value, password.value)

  if (ok) {
    router.push('/profile')
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="card-title text-center mb-4">Вход в систему</h2>

            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input 
                  id="email"
                  v-model="email" 
                  type="email" 
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors?.email }"
                  placeholder="Введите email" 
                  :disabled="isLoading"
                >
                <div v-if="validationErrors?.email" class="invalid-feedback">
                  {{ validationErrors.email[0] }}
                </div>
              </div>
              
              <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <input 
                  id="password"
                  v-model="password" 
                  type="password" 
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors?.password }"
                  placeholder="Введите пароль" 
                  :disabled="isLoading"
                >
                <div v-if="validationErrors?.password" class="invalid-feedback">
                  {{ validationErrors.password[0] }}
                </div>
              </div>
              
              <button 
                type="submit" 
                class="btn btn-primary w-100"
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                {{ isLoading ? 'Загрузка...' : 'Войти' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>