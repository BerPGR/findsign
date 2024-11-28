export const piniaModalStore = defineStore('modalStore', {
    state: () => ({
        idTopic: '',
        idCourse: '',
        editContent: {},
        editTopic: {}
    }),

    actions: {
        saveIdTopic(id) {
          this.idTopic = id  
        },

        saveIdCourse(id) {
            this.idCourse = id
        },

        setEditContent(content, idTopic) {
            this.editContent = {
                idTopic: idTopic,
                ...content
            }
        },

        setEditTopic(topic) {
            this.editTopic = topic
        },

        clearAll() {
            this.idCourse = '',
            this.idTopic = '',
            this.editTopic = {},
            this.editContent = {}
        }
    }
}) 