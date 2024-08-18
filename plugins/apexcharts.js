// plugins/apexcharts.js
export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
      import('vue3-apexcharts').then((module) => {
        nuxtApp.vueApp.use(module.default)
      })
    }
  })
  