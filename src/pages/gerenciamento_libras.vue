<template>
  <div>

    <div style="background-color: #1250ac; min-height: 75vh">
      <div class="container pb-5">

        <button class="btn btn-outline-light mt-4" @click="navigateBack">
          <i class="bi bi-arrow-left"></i>
        </button>


        <div class="d-flex align-items-center justify-content-center mt-4">
          <div style="width: 80%">
            <div class="accordion" id="accordionCursos">

              <template v-if="data.length === 0">
                <div class="text-center p-4">Não há cursos disponíveis</div>
              </template>

              <template v-else>
                <div
                  v-for="(curso, cursoIndex) in data"
                  :key="curso.id || cursoIndex"
                  class="accordion-item"
                >
                  <h2 class="accordion-header" :id="`headingCurso${cursoIndex}`">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="`#collapseCurso${cursoIndex}`"
                      aria-expanded="false"
                      :aria-controls="`collapseCurso${cursoIndex}`"
                    >
                      <span class="me-auto">{{ curso.name }}</span>
                      <button
                        @click.stop="addTopic(curso)"
                        class="btn btn-outline-secondary btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalTopic"
                      >
                        <i class="bi bi-plus-lg"></i>
                      </button>
                    </button>
                  </h2>
                  <div
                    :id="`collapseCurso${cursoIndex}`"
                    class="accordion-collapse collapse"
                    :aria-labelledby="`headingCurso${cursoIndex}`"
                    data-bs-parent="#accordionCursos"
                  >
                    <div class="accordion-body">

                      <div :id="`accordionTopicos${cursoIndex}`" class="accordion">
                        <template v-if="!curso.topic || curso.topic.length === 0">
                          <div class="text-center p-4">
                            Não há matérias para esse curso
                          </div>
                        </template>
                        <template v-else>
                          <div
                            v-for="(topico, topicoIndex) in curso.topic"
                            :key="topico.id || topicoIndex"
                            class="accordion-item"
                          >
                            <h2
                              class="accordion-header"
                              :id="`headingTopico${cursoIndex}-${topicoIndex}`"
                            >
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                :data-bs-target="`#collapseTopico${cursoIndex}-${topicoIndex}`"
                                aria-expanded="false"
                                :aria-controls="`collapseTopico${cursoIndex}-${topicoIndex}`"
                              >
                                <span class="me-auto">{{ topico.word }}</span>

                                <div style="align-self: flex-end">
                                  <button
                                    class="btn btn-outline-secondary btn-sm me-2"
                                    @click.stop="addSign(topico)"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalContent"
                                  >
                                    <i class="bi bi-plus-lg"></i>
                                  </button>
                                  <button
                                    @click="editTopicSave(topico)"
                                    class="btn btn-outline-success btn-sm me-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalEditTopic"
                                  >
                                    <i class="bi bi-pencil"></i>
                                  </button>
                                  <button
                                    class="btn btn-outline-danger btn-sm"
                                    @click.stop="deleteTopic(topico.id)"
                                  >
                                    <i class="bi bi-trash"></i>
                                  </button>
                                </div>
                              </button>
                            </h2>
                            <div
                              :id="`collapseTopico${cursoIndex}-${topicoIndex}`"
                              class="accordion-collapse collapse"
                              :aria-labelledby="`headingTopico${cursoIndex}-${topicoIndex}`"
                              :data-bs-parent="`#accordionTopicos${cursoIndex}`"
                            >
                              <div class="accordion-body">

                                <div
                                  v-if="!topico.libra || topico.libra.length === 0"
                                  class="text-center p-2"
                                >
                                  Não há sinais para essa matéria
                                </div>
                                <ul v-else class="list-group">
                                  <li
                                    v-for="(materia, materiaIndex) in topico.libra"
                                    :key="materia.id || materiaIndex"
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    {{ materia.name }}
                                    <div>
                                      <button
                                        @click="editContentSave(materia, topico.id)"
                                        class="btn btn-outline-success btn-sm me-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modalEditContent"
                                      >
                                        <i class="bi bi-pencil"></i>
                                      </button>
                                      <button
                                        class="btn btn-outline-danger btn-sm"
                                        @click="deleteSign(materia.id)"
                                      >
                                        <i class="bi bi-trash"></i>
                                      </button>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- Modais -->
        <ModalTopic @fetchTopicsData="fetchDataAfterEmit" />
        <ModalContent @fetch-data="fetchDataAfterEmit" />
        <ModalEditContent @fetch-data-after-put="fetchDataAfterEmit"/>
        <ModalEditTopic @fetch-topics-data-after-put="fetchDataAfterEmit"/>
      </div>
    </div>
    <!-- Rodapé -->
    <Footer />
  </div>
</template>

<script setup>
import { Modal, Toast } from "bootstrap";

const router = useRouter();
const { fetchAllCourses, deleteTopicById, deleteSignById } = useManageComposable();
const modalStore = piniaModalStore();

const data = ref([]);
const modalTopic = ref(null);
const modalContent = ref(null);
const modalEditContent = ref(null);
const modalEditTopic = ref(null);
const toast = ref(null)

// FUNÇÕES DA PÁGINA
const navigateBack = () => router.back();
const addSign = (topico) => modalStore.saveIdTopic(topico.id);
const addTopic = (curso) => modalStore.saveIdCourse(curso.id);

const deleteTopic = async (id) => {
  await deleteTopicById(id, toast.value);
  data.value = await fetchAllCourses() 
}

const deleteSign = async (id) => {
  await deleteSignById(id, toast.value)
  data.value = await fetchAllCourses();
}

const editContentSave = (content, idTopico) => {
  modalStore.setEditContent(content, idTopico)
}

const editTopicSave = (topic) => {
  modalStore.setEditTopic(topic)
}

const fetchDataAfterEmit = async () => {
  data.value = await fetchAllCourses();
};

onMounted(() => {
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
  document.body.appendChild(script);

  toast.value = new Toast(document.getElementById("liveToast"))

  modalTopic.value = new Modal(document.getElementById("modalTopic"));
  modalContent.value = new Modal(document.getElementById("modalContent"));
  modalEditTopic.value = new Modal(document.getElementById("modalEditTopic"));
  modalEditContent.value = new Modal(document.getElementById("modalEditContent"));
});

onBeforeMount(async () => {
  data.value = await fetchAllCourses();
});

onUnmounted(() => {
  modalContent.value?.dispose();
  modalEditContent.value?.dispose();
  modalTopic.value?.dispose();
  modalEditTopic.value?.dispose();
});

useHead({
  title: 'Gerenciamento de sinais'
})
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css");

.back-button:hover {
  background-color: #f8f9fa;
  color: #0d6efd;
}

.accordion-button::after {
  margin-left: 20px;
}
</style>
