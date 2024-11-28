export default defineNuxtRouteMiddleware((to) => {
    const userStore = piniaUserStore()

    if (to.path === '/gerenciamento_libras' && userStore.apiToken == '') {
        return navigateTo('/')
    }
})