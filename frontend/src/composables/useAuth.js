import { ref } from 'vue'
import axios from 'axios'

const user = ref(null)
const errorMessage = ref('')
const isLoading = ref(false)
const validationErrors = ref({})

export default function useAuth() {
  errorMessage.value = ''

  const getUser = async () => {
    try {
      const response = await axios.get('/api/me')
      user.value = response.data.data
    } catch (e) {
      user.value = null
      errorMessage.value = 'Не удалось получить данные пользователя'
    }
  }

  const login = async (email, password) => {
    isLoading.value = true
    errorMessage.value = ''
    validationErrors.value = {}

    try {
      await axios.get('/csrf-cookie')
      await axios.post('/api/login', { email, password })
      return true
    } catch (e) {
      if (e.response?.status === 422) {
        // Ошибки валидации
        validationErrors.value = e.response.data.errors || {}
        errorMessage.value = 'Пожалуйста, исправьте ошибки в форме'
      } else {
        // Сетевая ошибка или другие проблемы
        errorMessage.value = e.response.data.errors?.message || e.message
        console.log(e.response)
      }
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    errorMessage.value = ''

    try {
      await axios.post('/api/logout')
      user.value = null
    } catch (e) {
      errorMessage.value = 'Ошибка выхода'
    }
  }

  return {
    user,
    errorMessage,
    validationErrors,
    isLoading,
    login,
    logout,
    getUser
  }
}