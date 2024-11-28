<template>
  <div>
    <div
      class="modal fade"
      id="modalEditTopic"
      tabindex="-1"
      aria-labelledby="labelModalEditTopic"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content fw-semibold">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="labelModalEditTopic">Editar tópico</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label for="inputtopic" class="form-label">Nome do tópico</label>
              <input
                v-model="topicName"
                type="text"
                class="form-control border border-primary"
                id="inputtopic"
                placeholder="Digite o nome do sinal"
              />
              <div v-if="validationErrors.topicName" class="text-danger">
                {{ validationErrors.topicName }}
              </div>
            </div>

            <div class="mb-3">
              <label for="inputDescription" class="form-label">Descrição</label>
              <textarea
                v-model="topicDescription"
                class="form-control border border-primary"
                id="inputDescription"
                rows="3"
                placeholder="Digite uma descrição"
              ></textarea>
              <div v-if="validationErrors.topicDescription" class="text-danger">
                {{ validationErrors.topicDescription }}
              </div>
            </div>

            <div class="mb-3">
              <label for="inputImage" class="form-label"
                >Imagem (PNG/SVG)</label
              >
              <input
                @change="handleFileUpload"
                type="file"
                class="form-control border border-primary"
                id="inputImage"
                accept=".svg, .png"
              />
              <div v-if="validationErrors.imageFile" class="text-danger">
                {{ validationErrors.imageFile }}
              </div>
            </div>
          </div>

          <div class="modal-footer d-flex align-items-center">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>

            <button
              type="button"
              class="btn btn-primary"
              @click="handleEditTopic"
            >
              <div
                v-if="loading"
                class="spinner-grow spinner-grow-sm"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <div v-else>Adicionar</div>
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

const modalStore = piniaModalStore();
const { loading, editTopic } = useTopicComposable();
const emits = defineEmits(["fetchTopicsDataAfterPut"]);


const modal = ref(null);
const toast = ref(null);

const topicName = ref(modalStore.editTopic.word);
const topicDescription = ref(modalStore.editTopic.description);
const imageFile = ref("");

const validationErrors = ref({
  topicName: "",
  topicDescription: "",
  topicVideo: "",
  topicComment: "",
  imageFile: "",
});

// FUNÇÕES DA PÁGINA
const validateFields = () => {
  let isValid = true;
  validationErrors.value = {
    topicName: "",
    topicDescription: "",
    imageFile: "",
  };

  if (!topicName.value.trim()) {
    validationErrors.value.topicName = "O nome do tópico é obrigatório.";
    isValid = false;
  }
  if (!topicDescription.value.trim()) {
    validationErrors.value.topicDescription = "A descrição é obrigatória.";
    isValid = false;
  }
  if (!imageFile.value) {
    validationErrors.value.imageFile = "Uma imagem (PNG/SVG) é obrigatória.";
    isValid = false;
  }

  return isValid;
};

const handleEditTopic = async () => {
  if (!validateFields()) {
    return;
  }

  const body = {
    ...modalStore.editTopic,
    word: topicName.value,
    description: topicDescription.value,
    image: imageFile.value
  };

  await editTopic(body);
  emits("fetchTopicsDataAfterPut");
  modal?.value.hide()
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && (file.type === "image/svg+xml" || file.type === "image/png+xml")) {
    const reader = new FileReader();

    reader.onloadend = () => {
      imageFile.value = reader.result;
    };

    reader.readAsDataURL(file);
  } else {
    alert("Por favor, selecione apenas arquivos PNG ou SVG.");
    event.target.value = "";
  }
};

onMounted(() => {
  const modalElement = document.getElementById("modalEditTopic");
  if (modalElement) {
    modal.value = new Modal(modalElement);
  }

  const toastElement = document.getElementById("liveToast");
  if (toastElement) {
    toast.value = new Toast(toastElement);
  }
});

onUnmounted(() => {
  if (modal) {
    modal?.value.dispose();
  }
});

// Optional: Export methods to control the modal
defineExpose({
  show: () => modal?.value.show(),
  hide: () => modal?.value.hide(),
});
</script>
