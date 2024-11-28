
export function useUsersComposable() {
    const userStore = piniaUserStore()
    const toastStore = piniaToastStore()

    async function getUsers() {
        try {
            const res = await $fetch('/users', {
                baseURL: useRuntimeConfig().public.backend_url,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userStore.apiToken}`
                }
            })
    
            if (res) {
                return res
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function inviteUserByEmail(body, toast, store) {
        try {
            await $fetch('/auth/register-user', {
                baseURL: useRuntimeConfig().public.backend_url,
                method: 'POST',
                body: body,
                headers: {
                    'Authorization': `Bearer ${userStore.apiToken}`
                }
            })

            store.setToast("Usuário convidado!", 'success')
            toast.show()
        } catch (e) {
            store.setToast("Erro ao convidar usuário", 'danger')
            toast.show()
        }
    } 

    async function signupNewUser(body, toast, toastStore) {
        try {
            await $fetch('/auth/register', {
                baseURL: useRuntimeConfig().public.backend_url,
                method: 'POST',
                body: body,
            })

            toastStore.setToast('Usuário criado com sucesso! Redirecionando...', 'success')
            toast.show()
        } catch (e) {
            console.log(e);
        }
    }

    async function deleteUserById(userId) {
        try {
            await $fetch(`/users/${userId}`, {
                baseURL: useRuntimeConfig().public.backend_url,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userStore.apiToken}`
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    async function getUserDetailsByEmail(body) {
        try {
            const response = await $fetch('/users/public/email', {
                baseURL: useRuntimeConfig().public.backend_url,
                method: 'GET',
                query: {
                    email: body.email
                }
            })

            if (response) {
                return response
            }
        } catch (e) {
            console.log(e);
        }
    }

    return {
        getUsers,
        inviteUserByEmail,
        deleteUserById,
        getUserDetailsByEmail,
        signupNewUser
    }
}