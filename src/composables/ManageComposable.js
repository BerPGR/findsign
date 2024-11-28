
export function useManageComposable() {
    const userStore = piniaUserStore()
    const toastStore = piniaToastStore()

    async function fetchAllCourses() {
        try {
            const response = await $fetch('/course/all', {
                baseURL: useRuntimeConfig().public.backend_url,
                method: 'GET'
            })

            if (response) {
                return response
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    async function deleteTopicById(id, toast) {
        if (userStore.apiToken) {
            try {
                await $fetch(`/topics/${id}`, {
                    baseURL: useRuntimeConfig().public.backend_url,
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${userStore.apiToken}`,
                    }
                })

                toastStore.setToast('Tópico deletado!', 'warning')
                toast.show()
            }
            catch(e) {
                console.log(e);
            }
        }
    } 

    async function deleteSignById(id, toast) {
        if (userStore.apiToken) {
            try {
                await $fetch(`/sign/${id}`, {
                    baseURL: useRuntimeConfig().public.backend_url,
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${userStore.apiToken}`,
                    }
                })

                toastStore.setToast('Conteúdo deletado!', 'warning')
                toast.show()
            }
            catch(e) {
                console.log(e);
            }
        }
    } 

    return {
        fetchAllCourses,
        deleteTopicById,
        deleteSignById
    }
}