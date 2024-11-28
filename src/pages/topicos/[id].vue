<template>
  <div>
    <div style="background-color: #1250ac; min-height: 70vh">
      <div class="container py-4">
        <button class="btn btn-outline-light mt-4" @click="navigateBack">
          <i class="bi bi-arrow-left"></i>
        </button>

        <button
          v-if="userStore.apiToken"
          class="btn btn-outline-light mt-4 ms-4"
          @click="navigatoToManage"
        >
          <i class="bi bi-gear"></i>
        </button>

        <div class="mt-4 d-flex justify-content-between flex-wrap">
          <div
            class="accordion"
            style="width: 28rem"
            id="topicsAccordion"
            v-if="topics.length"
          >
            <div class="accordion-item" v-for="(topic, i) in topics" :key="i">
              <h2 class="accordion-header" :id="'heading' + i">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#collapse' + i"
                  aria-expanded="false"
                  :aria-controls="'collapse' + i"
                  @click="getContentFromTopic(topic)"
                >
                  <div class="d-flex align-items-center">
                    <img class="me-2" :src="topic.image" height="30" />

                    <span class="fs-5">{{ topic.word }}</span>
                  </div>
                </button>
              </h2>
              <div
                :id="'collapse' + i"
                class="accordion-collapse collapse"
                :aria-labelledby="'heading' + i"
                data-bs-parent="#topicsAccordion"
              >
                <div class="accordion-body">
                  <div v-if="content.length">
                    <ul class="list-group">
                      <li
                        class="list-group-item list-group-item-action"
                        v-for="(content, cIndex) in content"
                        :key="cIndex"
                        @click="changeVideoContent(content.urlVideo)"
                        style="cursor: pointer"
                      >
                        <div class="d-flex align-items-center">
                          <img
                            v-if="content.urlImage !== ''"
                            :src="content.urlImage"
                            alt=""
                            height="30px"
                            class="me-3"
                          />
                          <i v-else class="bi bi-filetype-sql me-3"></i>
                          <span>{{ content.name }}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div v-else class="text-center">
                    <small>Sem conteúdo disponível para este tópico.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="loading" class="text-center mt-4" style="width: 100%">
            <div class="spinner-grow text-white" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div class="col-md-6" v-if="selectedVideo">
            <div class="custom-iframe">
              <iframe
                :src="selectedVideo"
                class="border"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>

        <div v-if="!topics.length && !loading" class="text-center mt-4">
          <div class="card text-center p-4">Não há dados para esse curso</div>
        </div>
      </div>

      <ToastComponent />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { Toast } from "bootstrap";

const route = useRoute();
const router = useRouter();
const userStore = piniaUserStore();
const id = route.params.id;
const { loading, fetchTopicsById, fetchTopicContent } = useTopicComposable();

const topics = ref([]);
const content = ref([]);
const clickedTopic = ref(null);
const toast = ref(null);
const selectedVideo = ref(null);

// Funções da página
onMounted(async () => {
  topics.value = await fetchTopicsById(id);

  const toastElement = document.getElementById("liveToast");
  if (toastElement) {
    toast.value = new Toast(toastElement);
  }
});

const getContentFromTopic = async (topic) => {
  closeSelectedVideo()
  const topicId = topic.id;
  const response = await fetchTopicContent(topicId);

  if (response) {
    clickedTopic.value = topic.word;
    content.value = response;
  }
};

const changeVideoContent = (urlVideo) => {
  selectedVideo.value = urlVideo.replace("watch?v=", "embed/");
};

const navigateBack = () => {
  router.replace("/findsign");
};

const navigatoToManage = () => {
  router.push("/gerenciamento_libras");
};

const closeSelectedVideo = () => selectedVideo.value = null

useHead({
  title: 'Repositório'
})
</script>

<style>
.icon-container {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-iframe iframe {
  height: 300px;
  width: 80%;
}
</style>
