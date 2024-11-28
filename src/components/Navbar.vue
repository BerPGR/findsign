<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg">
      <div class="container header-container">
        <!-- Esquerda -->
        <div class="header-left">
          <img src="/assets/images/udf-logo.png" alt="" height="60" />
          <img src="/assets/images/signacle-logo.png" alt="" height="60" class="ms-4" />
          <!--
          <img
            src="https://www.udf.edu.br/wp-content/themes/cruzeiroportais2019/assets/imagens/svg-icon-contraste.svg"
            alt=""
            width="15"
          />
          <a class="accessibility text-white">A+</a>
          <a class="accessibility text-white">A-</a>-->
        </div>

        <!-- Direita -->
        <div class="header-right">
          <nuxt-link to="/">
            <button
              class="btn btn-link text-white fw-bold"
              style="text-decoration: none;"
            >
              Início
            </button>
          </nuxt-link>
          <button
            class="btn btn-link text-white fw-bold"
            style="text-decoration: none"
            @click="navigateToFindSign"
          >
            FindSign
          </button>
          <nuxt-link to="https://udf.edu.br">
            <button
              class="btn btn-link text-white fw-bold"
              style="text-decoration: none"
            >
              Contato
            </button>
          </nuxt-link>
          <!-- Ícone de Login -->
          <button
            v-if="userStore.apiToken == null"
            type="button"
            class="btn btn-icon pl-2 text-white"
            data-bs-toggle="modal"
            data-bs-target="#modalLogin"
          >
          <i class="bi bi-box-arrow-in-right fs-4"></i>
          </button>
          <button
            v-else
            type="button"
            class="btn btn-icon pl-2 text-white"
            data-bs-toggle="modal"
            data-bs-target="#modalLoginInfo"
          >
            <i class="fas fa-user fs-4"></i>
          </button>
        </div>
      </div>
    </nav>

    <ToastComponent v-if="toastIsVisible" />
    <ModalLogin />
    <ModalLoginInfo />
  </header>
</template>

<script setup>
import { Toast } from "bootstrap";

const userStore = piniaUserStore();
const toastStore = piniaToastStore();
const router = useRouter();

const toast = ref(null);
const toastIsVisible = ref(false);

onMounted(() => {
  const toastElement = document.getElementById("liveToast");
  if (toastElement) {
    toast.value = new Toast(toastElement);
  }
});

const navigateToFindSign = () => {
  router.push("/findsign");
};

</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px; /* Espaço entre os itens */
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px; /* Espaço entre os botões */
}

.accessibility {
  margin-left: 10px;
  text-decoration: none;
  font-size: 1rem;
  color: #fff;
}

.btn-link {
  transition: all 0.3s ease;
}

.btn-link:hover {
  background-color: #00AEFF;
}

.modal-content {
  border-radius: 8px;
}
</style>
