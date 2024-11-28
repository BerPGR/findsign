
export function useCoursesComposable() {

    const loading = ref(false) 

    async function fetchCourses(toast, toastStore) {
        try {
            loading.value = true

            const response = await $fetch('/course', {
                baseURL: useRuntimeConfig().public.backend_url,
                method: 'GET'
            })

            if (response) {
                loading.value = false
                return response
            }

            toastStore.setToast('Sem cursos disponíveis', 'warning')
            loading.value = false
            toast.show()
        }
        catch (e) {
            toastStore.setToast('Erro ao buscar cursos', 'danger')
            loading.value = false
            toast.show()
        }
    }

    return {
        loading,
        fetchCourses
    }
}