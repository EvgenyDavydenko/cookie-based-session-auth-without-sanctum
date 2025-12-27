import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import HomePage from '../views/HomePage.vue'
import useAuth from '../composables/useAuth'



const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: HomePage },
  { path: '/login', component: LoginPage, meta: { guestOnly: true } },
  { path: '/profile', component: ProfilePage, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Перед каждым переходом выполняем проверку доступа к маршруту
// и при несоответствии условий выполняем перенаправление
router.beforeEach(async (to) => {
  const { user, getUser } = useAuth()
  console.log('В роутере user:', user.value)

  // Если маршрут требует авторизации,
  // а пользователь не вошел - отправляем на логин
  if (to.meta.requiresAuth) {
    try {
      await getUser()
      if (!user.value) return '/login'
    } catch {
      return '/login'
    }
  }

  // Если страница только для гостей,
  // а пользователь уже вошел в систему - отправляем в профиль
  if (to.meta.guestOnly && user.value) {
    return '/profile'
  }
})

export default router
