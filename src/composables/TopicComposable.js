
export function useTopicComposable() {
    const loading = ref(false)
    const toastStore = piniaToastStore()
    const userStore = piniaUserStore()

    async function fetchTopicsById(idCourse) {
        try {
            loading.value = true
            
            const res = await $fetch(`/topics/course-id/${idCourse}`, {
                baseURL: useRuntimeConfig().public.backend_url,
                method: 'GET',
            })
    
            if (res) {
                loading.value = false
                return res
            }

            loading.value = false
        } catch(e) {
            console.log(e);
        }   
    }

    async function fetchTopicContent(topicId) {
        loading.value = true

        try {
            const res = await $fetch(`/sign/topic-id/${topicId}`, {
                baseURL: useRuntimeConfig().public.backend_url,
                method: 'GET',
            })

            if (res) {
                loading.value = false
                return res
            }

            loading.value =  false
        } catch (e) {
            loading.value =  false
        }
    }

    async function addNewSignToTopic(signBody, toast) {
        loading.value = false
        const userToken = userStore.apiToken

        try {
            await $fetch('/sign', {
                baseURL: useRuntimeConfig().public.backend_url,
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userToken}` 
                },
                body: signBody
            })
            toastStore.setToast('Conteúdo adicionado com sucesso!', 'success')
            toast.show()
            loading.value =  false

        } catch (e) {
            loading.value =  false
            toastStore.setToast('Erro ao adicionar conteúdo!', 'danger')
            toast.show()
        }
    }

    async function addNewTopicByCourseId(bodyTopic, toast) {
        if (userStore.apiToken) {
            try {
                await $fetch(`/topics`, {
                    baseURL: useRuntimeConfig().public.backend_url,
                    method: 'POST',
                    body: bodyTopic,
                    headers: {
                        'Authorization': `Bearer ${userStore.apiToken}`
                    }
                })

                toastStore.setToast("Novo tópico cadastrado!", 'success')
                toast.show()
            } catch (e) {
                console.log(e)
                toastStore.setToast("Erro ao cadastrar tópico!", 'danger')
                toast.show()
            }
        }
    }

    async function editTopic(body) {
        try {
            await $fetch('/topics', {
                baseURL: useRuntimeConfig().public.backend_url,
                method: 'PUT',
                body: body,
                headers: {
                    'Authorization': `Bearer ${userStore.apiToken}`
                }
            })
        } catch (e) {
            console.log(e);
        }
    }

    async function editContent(body) {
        try {
            await $fetch('/sign', {
                baseURL: useRuntimeConfig().public.backend_url,
                method: 'PUT',
                body: body,
                headers: {
                    'Authorization': `Bearer ${userStore.apiToken}`
                }
            })
        } catch (e) {
            console.log(e);
        }
    }

    return {
        loading,
        fetchTopicsById,
        fetchTopicContent,
        addNewSignToTopic,
        addNewTopicByCourseId,
        editContent,
        editTopic
    }
}
