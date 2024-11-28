<template>
  <div>
    <div
      class="modal fade"
      id="modalLoginInfo"
      tabindex="-1"
      aria-labelledby="labelModalLoginInfo"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content fw-semibold">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="labelModalLoginInfo">Olá, {{userStore.currentUserDetails?.fullName}}!</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-footer d-flex align-items-center">
            <button
            @click="logout"
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Logout
            </button>

            <button
              type="button"
              class="btn btn-primary"
              @click="navigateToUsuarios"
            >
              <div>Verificar usuários</div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <ToastComponent />
  </div>
</template>

<script setup>
import { Modal, Toast } from "bootstrap";

const userStore = piniaUserStore()
const toastStore = piniaToastStore()
const router = useRouter()
const modal = ref(null);
const toast = ref(null);

const logout = () => {
  userStore.logout()
  toastStore.setToast("Você desconectou da conta", "warning");
  toast.value.show();
  modal.value.hide()
  router.replace('/')
} 

const navigateToUsuarios = () => {
    router.push('/usuarios')
    modal.value.hide()
}

onMounted(() => {
    const modalElement = document.getElementById('modalLoginInfo')
    if (modalElement) {
        modal.value = new Modal(modalElement)
    }

    const toastElement = document.getElementById('liveToast')
    if (toastElement) {
      toast.value = new Toast(toastElement)
    }
})

onUnmounted(() => {
    if (modal.value) {
        modal.value.dispose()
    }
})

defineExpose({
  show: () => modal?.value.show(),
  hide: () => modal?.value.hide(),
});
</script>
