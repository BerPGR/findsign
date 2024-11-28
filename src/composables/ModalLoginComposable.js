export function useModalComposable() {
    let loading = ref(false)
    let email = ref("")
    let password = ref("")
    const userStore = piniaUserStore()
    const toastStore = piniaToastStore()

    async function login(userEmail, userPassword, toast, userDetails) {
        try {
            loading.value = true
        
            const body = {
                email: userEmail,
                password: userPassword
            }
    
            const res = await $fetch("/auth/authenticate", {
                baseURL: useRuntimeConfig().public.backend_url,
                method: 'POST',
                body: body,
            })
    
            if (res.token) {
                toastStore.setToast("Login realizado com sucesso!", 'success')
                userStore.saveUserToken(res.token, userDetails)
                toast.show()
            }

            loading.value = false

        } catch(e) {
            loading.value = false
            toastStore.setToast("Falha ao realizar o login!", 'danger')
            toast.show()
        }   
    }

    return {
        email,
        password,
        loading,
        login
    }
}