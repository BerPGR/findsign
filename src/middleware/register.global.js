export default defineNuxtRouteMiddleware((to) => {
    const route = useRoute()

    const query = route.query
    
    if (to.path === '/cadastro_usuario' && Object.keys(query).length === 0) {
        return navigateTo('/')
    }
})