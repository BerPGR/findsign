<template>
  <div>
    <div style="background-color: #1250ac; min-height: 70vh">
      <div class="container pt-5 d-flex flex-column align-items-center">
        <div class="d-flex align-items-center justify-content-between w-100">
          <h1 style="color: #0db9fd" class="fw-bold">Listagem de Usuários</h1>
          <button class="btn btn-primary" @click="toggleInput">
            {{ showInput ? "Cancelar" : "Adicionar Usuário" }}
          </button>
        </div>

        <div v-if="showInput" class="mt-3" style="width: 50rem">
          <div class="input-group">
            <input
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Digite email de um novo usuário"
            />
            <button class="btn btn-success" @click="addUser">Adicionar</button>
          </div>
          <div v-if="emailError" class="text-danger mt-1">{{ emailError }}</div>
        </div>

        <div class="list-group mb-4 mt-4" style="width: 50rem">
          <div
            v-for="(user, i) in users"
            :key="i"
            class="list-group-item d-flex align-items-center justify-content-between"
          >
            <p>{{ user.fullName }} | {{ user.email }}</p>
            <button class="btn btn-icon" @click="removeUser(user.id)">
              <i class="bi bi-trash icon-delete"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { Toast } from 'bootstrap'
const { getUsers, inviteUserByEmail, deleteUserById } = useUsersComposable();

const users = ref([]);
const showInput = ref(false);
const email = ref("");
const emailError = ref(null);
const toast = ref(null)

// FUNÇÕES DA PÁGINA
onMounted(async () => {
  users.value = await getUsers();

  const toastElement = document.getElementById('liveToast')
  if (toastElement) {
    toast.value = new Toast(toastElement)
  }
});

const toggleInput = () => {
  showInput.value = !showInput.value;
  email.value = "";
};

const addUser = async () => {
  if (email.value.trim()) {
    emailError.value = null;

    if (!email.value) {
      emailError.value = "O e-mail é obrigatório.";
    } else if (!isValidEmail(email.value)) {
      emailError.value = "Insira um e-mail válido.";
    } else {
      const body = {
        email: email.value,
      };
      await inviteUserByEmail(body, toast.value);
      showInput.value = !showInput.value;
      email.value = "";
    }
  }
};

const removeUser = async (id) => {
  await deleteUserById(id);
  users.value = await getUsers();
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

useHead({
  title: 'Usuários'
})
</script>

<style scoped>
.icon-delete {
  color: #dc3545;
}
</style>
