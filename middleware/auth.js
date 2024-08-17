import { useCookie } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = useCookie('user_authenticated').value
  if (!isAuthenticated) {
    return navigateTo('/login')
  }
})
