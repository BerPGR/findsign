<template>
  <div>
    <div style="background-color: #1250ac; min-height: 70vh">
      <div class="container pt-5 pb-5">
        <h1 class="fw-bolder" style="color: #0db9fd">Cadastro de Usuário</h1>

        <!-- Formulário de Cadastro -->
        <form
          @submit.prevent="registerUser"
          class="d-flex flex-column align-items-center"
        >
          <!-- Nome -->
          <div style="width: 50rem">
            <div class="mb-3">
              <label for="nome" class="form-label fw-bold text-white"
                >Nome</label
              >
              <input
                v-model="nome"
                type="text"
                id="nome"
                class="form-control py-2"
                placeholder="Digite seu nome"
              />
              <div v-if="validationErrors.nome" class="text-danger fw-bold">
                {{ validationErrors.nome }}
              </div>
            </div>

            <!-- Sobrenome -->
            <div class="mb-3">
              <label for="sobrenome" class="form-label fw-bold text-white"
                >Sobrenome</label
              >
              <input
                v-model="sobrenome"
                type="text"
                id="sobrenome"
                class="form-control py-2"
                placeholder="Digite seu sobrenome"
              />
              <div v-if="validationErrors.sobrenome" class="text-danger">
                {{ validationErrors.sobrenome }}
              </div>
            </div>

            <!-- Email -->
            <div class="mb-3">
              <label for="email" class="form-label fw-bold text-white"
                >Email</label
              >
              <input
                v-model="email"
                readonly
                type="email"
                id="email"
                class="form-control py-2"
                placeholder="Digite seu email"
              />
            </div>

            <!-- Senha -->
            <div class="mb-3">
              <label for="senha" class="form-label fw-bold text-white"
                >Senha</label
              >
              <input
                v-model="senha"
                type="password"
                id="senha"
                class="form-control py-2"
                placeholder="Digite sua senha"
                minlength="6"
              />
              <div v-if="validationErrors.senha" class="text-danger">
                {{ validationErrors.senha }}
              </div>
            </div>

            <!-- Botão de Cadastro -->
            <button type="submit" class="btn btn-primary" @click="registerUser">
              Cadastrar
            </button>
          </div>
        </form>

      </div>
    </div>
    <ToastComponent />
    <Footer />
  </div>
</template>

<script setup>
import { Toast } from 'bootstrap'

const router = useRouter();
const { signupNewUser, getUserDetailsByEmail } = useUsersComposable();
const userStore = piniaUserStore();
const toastStore = piniaToastStore()
const route = useRoute();
const userDetails = ref(null);

const nome = ref("");
const sobrenome = ref("");
const email = ref(route.query.email);
const senha = ref("");
const toast = ref(null)

const validationErrors = ref({
  nome: "",
  sobrenome: "",
  senha: "",
});

onMounted(async () => {
  const body = {
    email: email.value,
  };
  userDetails.value = await getUserDetailsByEmail(body);

  const toastElement = document.getElementById('liveToast')
  if (toastElement) {
    toast.value = new Toast(toastElement)
  }

  userStore.logout()
});

const validateFields = () => {
  let isValid = true;
  validationErrors.value = {
    nome: "",
    sobrenome: "",
    senha: "",
  };

  if (nome.value.trim() == "") {
    validationErrors.value.nome = "O nome do usuário é obrigatório.";
    isValid = false;
  }

  if (sobrenome.value.trim() == "") {
    validationErrors.value.sobrenome = "O sobrenome do usuário é obrigatório."
    isValid = false
  }

  if (senha.value.trim() == "") {
    validationErrors.value.senha = "Senha é obrigatória"
    isValid = false
  }

  return isValid;
}

const registerUser = async () => {
  if (!validateFields()) {
    return
  } else {
    const body = {
      id: userDetails.value.id,
      firstName: nome.value,
      lastName: sobrenome.value,
      email: email.value,
      password: senha.value,
    };
    
    await signupNewUser(body, toast.value, toastStore);
    userStore.currentUserDetails = await getUserDetailsByEmail(body);
    router.replace('/')
  }
};

useHead({
  title: 'Cadastro de usuário'
})
</script>
