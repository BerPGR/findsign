
export const piniaToastStore = defineStore('toast', {
    state: () => ({
        mensagem: '',
        resultado: ''
    }),

    actions: {
        setToast(message, result) {
            this.mensagem = message
            this.resultado = result // success, warning, danger
        }
    }
})