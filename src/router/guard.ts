import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/users/user'

export function setupRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const token = localStorage.getItem('token')

    if (to.path === '/') {
      if (!token) return next('/login')

      if (!userStore.user?.role) {
        try {
          await userStore.getUser()
        } catch {
          return next('/login')
        }
      }

      if (userStore.user?.role === 'user') return next('/user/animals')
      if (userStore.user?.role === 'organization') return next('/organization/animals')

      return next()
    }

    const publicRoutes = ['/login', '/register']

    if (!token && !publicRoutes.includes(to.path)) {
      return next('/login')
    }

    if (token && !userStore.user?.role) {
      try {
        await userStore.getUser()
      } catch (error) {
        console.error('Ошибка при загрузке пользователя:', error)
        return next('/login')
      }
    }

    next()
  })
}
