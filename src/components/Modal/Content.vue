<template>
  <div>
    <div
      class="modal fade"
      id="modalContent"
      tabindex="-1"
      aria-labelledby="labelModalConteudo"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content fw-semibold">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="labelModalConteudo">Conteúdo</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label for="inputPalavra" class="form-label">Nome do sinal</label>
              <input
                v-model="sinalNome"
                type="text"
                class="form-control border border-primary"
                id="inputPalavra"
                placeholder="Digite o nome do sinal"
              />
              <div v-if="validationErrors.sinalNome" class="text-danger">
                {{ validationErrors.sinalNome }}
              </div>
            </div>

            <div class="mb-3">
              <label for="inputDescricao" class="form-label">Descrição</label>
              <textarea
                v-model="sinalDescricao"
                class="form-control border border-primary"
                id="inputDescricao"
                rows="3"
                placeholder="Digite uma descrição"
              ></textarea>
              <div v-if="validationErrors.sinalDescricao" class="text-danger">
                {{ validationErrors.sinalDescricao }}
              </div>
            </div>

            <div class="mb-3">
              <label for="inputImagem" class="form-label"
                >Imagem (PNG/SVG)</label
              >
              <input
                @change="handleFileUpload"
                type="file"
                class="form-control border border-primary"
                id="inputImagem"
                accept=".svg, .png"
              />
              <div v-if="validationErrors.imageFile" class="text-danger">
                {{ validationErrors.imageFile }}
              </div>
            </div>

            <div class="mb-3">
              <label for="inputVideo" class="form-label"
                >Vídeo (link do YouTube)</label
              >
              <input
                v-model="sinalVideo"
                type="url"
                class="form-control border border-primary"
                id="inputVideo"
                placeholder="Cole o link do vídeo do YouTube"
              />
              <div v-if="validationErrors.sinalVideo" class="text-danger">
                {{ validationErrors.sinalVideo }}
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
              @click="handleAddNewSign"
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

const modal = ref(null);
const toast = ref(null);

const sinalNome = ref("");
const sinalDescricao = ref("");
const imageFile = ref("");
const sinalVideo = ref("");

const validationErrors = ref({
  sinalNome: "",
  sinalDescricao: "",
  imageFile: "",
  sinalVideo: "",
});

const { addNewSignToTopic, loading } = useTopicComposable();
const modalStore = piniaModalStore();
const emit = defineEmits(["fetchData"]);

// Função para validar e formatar o link do YouTube
const formatYouTubeLink = (url) => {
  let videoUrl = "";
  const youtubeLinkParam = new URLSearchParams(new URL(url).search).get("v");
  if (youtubeLinkParam) {
    videoUrl = "https://www.youtube.com/embed/" + youtubeLinkParam;
  }
  
  return videoUrl ?? null;
};

const validateFields = () => {
  let isValid = true;
  validationErrors.value = {
    sinalNome: "",
    sinalDescricao: "",
    imageFile: "",
    sinalVideo: "",
  };

  if (!sinalNome.value.trim()) {
    validationErrors.value.sinalNome = "O nome do sinal é obrigatório.";
    isValid = false;
  }
  if (!sinalDescricao.value.trim()) {
    validationErrors.value.sinalDescricao = "A descrição é obrigatória.";
    isValid = false;
  }

  // Validando o vídeo
  const formattedVideo = formatYouTubeLink(sinalVideo.value);
  if (!formattedVideo) {
    validationErrors.value.sinalVideo = "Insira um link válido do YouTube.";
    isValid = false;
  } else {
    sinalVideo.value = formattedVideo;
  }

  if (!imageFile.value) {
    validationErrors.value.imageFile = "Uma imagem (PNG/SVG) é obrigatória.";
    isValid = false;
  }

  return isValid;
};

const handleAddNewSign = async () => {
  if (!validateFields()) {
    return;
  }

  const body = {
    name: sinalNome.value,
    description: sinalDescricao.value,
    urlImage: imageFile.value,
    urlVideo: sinalVideo.value,
    idTopic: modalStore.idTopic,
  };

  await addNewSignToTopic(body, toast.value);
  cleanFields()
  emit("fetchData");
};

const cleanFields = () => {
  sinalNome.value = ""
  sinalDescricao.value = ""
  sinalVideo.value = ""
  imageFile.value = ""
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (
    file &&
    (file.type === "image/svg+xml" || file.type === "image/png")
  ) {
    const reader = new FileReader();

    reader.onloadend = () => {
      imageFile.value = reader.result;
    };

    reader.readAsDataURL(file);
  } else {
    validationErrors.value.imageFile =
      "Por favor, selecione apenas arquivos SVG.";
    event.target.value = "";
  }
};

onMounted(() => {
  const modalElement = document.getElementById("modalContent");
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
    modal.value.dispose();
  }
});

defineExpose({
  show: () => modal?.value.show(),
  hide: () => modal?.value.hide(),
});
</script>
