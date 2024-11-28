<template>
  <div>
    <div class="d-flex justify-content-between pb-4" style="background-color: #1250ac; min-height: 75vh">
      <div class="col-md-6">
        <div style="margin-top: 50px">
          <div
            class="container text-start d-flex flex-column align-items-center animated-content"
          >
            <h2
              class="ps-4 ms-4 fs-1"
              style="font-weight: 900; align-self: flex-start; color: #00AEFF"
            >
              {{ currentContent?.title || "FindSign" }}
            </h2>
            <p
              class="ps-4 ms-4 mt-2 fs-6 text-white fw-semibold lh-sm"
              style="text-align: justify"
              v-if="!chooseContent"
            >
              E se nós pudéssemos ter uma grande nuvem de dados para consultar de maneira gratuita, virtual e acessível?
              Pesquisar vários sinais da Libras de diversas áreas diferentes
              do conhecimento, criados pelo Brasil afora e também aqui no contexto interno do UDF,
              com o objetivo de responder de maneira concreta a falta de sinais e termos específicos na língua?
              Então, fazer isso aqui é possível sim!<br /><br /></p>

              <p
                class="ps-4 ms-4 mt-2 fs-6 text-white"
                style="text-align: justify"
                v-if="!chooseContent"
              >
              A nossa proposta no FindSign é oferecer um ambiente on-line, aplicado ao
              armazenamento de fontes de consulta variadas em libras sobre conteúdos de ensino
              e aprendizagem diversos, próprios de conceitos educacionais acadêmicos, de cursos
              de nível superior aqui do UDF, em Brasília, para auxiliar o estudante, seja surdo ou ouvinte,
              a usar de maneira concreta dicionários on-line de sinais/termos referentes a conteúdos terminológicos 
              complexos do contexto acadêmicos de estudos. Inicialmente, o <strong>FindSign</strong> vai oferecer oportunidades de consulta de cursos daqui
              do UDF, em que há estudantes surdos e também cursos em que os conteúdos já estão oferecidos em libras.
              O cursos estão listados aqui, e são eles:
              <ul>
                <li><strong>Tecnologia da Informação</strong></li>
                <li><strong>Medicina Veterinária</strong></li>
                <li><strong>Nutrição</strong></li>
                <li><strong>Negócios</strong></li>
              </ul>
            </p>
            <p
              v-else
              class="ps-4 ms-4 mt-2 fs-6 text-white fw-semibold lh-sm"
              style="text-align: justify"
            >
              {{ currentContent.text }}
            </p>
            <button
              @click="navigateToTopics"
              v-if="chooseContent"
              class="btn btn-primary btn-block rounded-pill px-4 py-3 fw-bold fs-5 border"
              :class="{
                'my-4': chooseContent === true,
              }"
              style="align-self: flex-start; margin-left: 3rem"
              type="button"
            >
              Acessar repositório
            </button>
            <div
              class="row row-cols-auto d-flex align-items-center justify-content-evenly w-100"
            >
              <div class="col mt-4" v-for="(course, i) in courses" :key="i">
                <button
                  class="btn curso-btn d-flex align-items-center justify-content-center p-3"
                  @click="changeTopic(course.id, i)"
                >
                  <img :src="cursosImages[i]" alt="..." width="70px" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-4">
        <div class="custom-iframe" style="align-items: end; margin-top: 74px">
          <iframe
            src="https://www.youtube.com/embed/pGdL9wgy6E8"
            title="Alfabeto de LIBRAS - COMPLETO E INESQUECÍVEL"
            class="border"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import tiLogo from "@/assets/images/svgs/ti.svg";
import medVetLogo from "@/assets/images/svgs/medvet.svg";
import nutriLogo from "@/assets/images/svgs/nutri.svg";
import businessLogo from "@/assets/images/svgs/business.svg";
import data from "@/assets/data/dummydata.js";

import { Toast } from "bootstrap";

const router = useRouter();
const toastStore = piniaToastStore();
const { fetchCourses } = useCoursesComposable();

const cursosImages = [tiLogo, medVetLogo, nutriLogo, businessLogo];

const toast = ref(null);
const courses = ref([]);
const chooseContent = ref(false);
const currentContent = ref(null);
const currentTopicId = ref(null);

// Funções da página
onMounted(async () => {
  const toastElement = document.getElementById("liveToast");
  if (toastElement) {
    toast.value = new Toast(toastElement);
  }

  courses.value = await fetchCourses(toast.value, toastStore);
});

const changeTopic = (id, index) => {
  chooseContent.value = true;
  currentContent.value = data[index];
  currentTopicId.value = id;
};

const navigateToTopics = () => {
  router.push(`/topicos/${currentTopicId.value}`);
};

useHead({
  title: "FindSign",
});
</script>

<style>
.curso-btn {
  border: 2px solid #0db9fd;
}

.curso-btn:hover {
  transform: scale(1.2);
  transition: all 0.5s ease;
  box-shadow: 0 1rem 3rem rgb(174, 174, 174);
  background-color: #00AEFF;
}

.curso-btn:not(:hover) {
  transform: scale(1);
  transition: all 0.5s ease;
  box-shadow: 0;
}

.curso-btn:focus {
  transition: all 0.5s ease;
  background-color: #00AEFF;
  transform: scale(1.2);
  box-shadow: 0;
}

.custom-iframe iframe {
  height: 450px;
  width: 80%;
}

.animated-content {
  transform: opacity 0.5s ease-in;
}
</style>
