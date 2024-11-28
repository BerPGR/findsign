<template>
  <div>
    <div class="modal fade" id="modalLogin" tabindex="-1" aria-labelledby="labelModalLogin" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">

          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Faça login para continuar</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <p>E-mail</p>
            <input 
              type="email" 
              placeholder="E-mail" 
              class="form-control border mt-2" 
              :class="{'border-danger': emailError}" 
              v-model="email"
            />
            <div v-if="emailError" class="text-danger mt-1">{{ emailError }}</div>

            <p style="margin-top: 2rem;">Senha</p>
            <input 
              type="password" 
              placeholder="Senha" 
              class="form-control border mt-2"
              :class="{'border-danger': passwordError}" 
              v-model="password"
            />
            <div v-if="passwordError" class="text-danger mt-1">{{ passwordError }}</div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>

            <button type="button" class="btn btn-primary" style="width: 5rem;" @click="validateAndLogin">
              <div v-if="loading" class="spinner-grow spinner-grow-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div v-else>
                Login
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
    <ToastComponent />
  </div>
</template>

<script setup>
import { Modal, Toast } from 'bootstrap'

const modal = ref(null)
const toast = ref(null)
const emailError = ref(null)
const passwordError = ref(null)

const {email, loading, password, login} = useModalComposable()
const { getUserDetailsByEmail } = useUsersComposable()
const userStore = piniaUserStore()

//FUNÇÕES DA PÁGINA
onMounted(() => {
    const modalElement = document.getElementById('modalLogin')
    if (modalElement) {
        modal.value = new Modal(modalElement)
    }

    const toastElement = document.getElementById('liveToast')
    if (toastElement) {
        toast.value = new Toast(toastElement)
    }
})

onUnmounted(() => {
    if (modal) {
        modal.value.dispose()
    }
})

const validateAndLogin = async () => {
  emailError.value = null
  passwordError.value = null

  if (!email.value) {
    emailError.value = 'O e-mail é obrigatório.'
  } else if (!isValidEmail(email.value)) {
    emailError.value = 'Insira um e-mail válido.'
  }

  if (!password.value) {
    passwordError.value = 'A senha é obrigatória.'
  }

  if (!emailError.value && !passwordError.value) {    
    const currentUserDetails = await getUserDetailsByEmail({
      email: email.value
    })
    await login(email.value, password.value, toast.value, currentUserDetails)
  }

  setTimeout(() => {
    modal?.value.hide()
  }, 500)
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}


// Optional: Export methods to control the modal
defineExpose({
    show: () => modal?.value.show(),
    hide: () => modal?.value.hide()
})
</script>