export default defineNuxtRouteMiddleware((to) => {
    const userStore = piniaUserStore()
    
    if (to.path === '/usuarios' && userStore.apiToken == "") {
        return navigateTo('/')
    }
})