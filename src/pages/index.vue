<template>
  <div>
    <div
      class="container-fluid text-white d-flex align-items-center pb-4"
      style="background-color: #1250ac; min-height: 80vh"
    >
      <div
        class="container d-flex align-items-center justify-content-between mt-4"
      >
        <div
          class="d-flex flex-column align-items-start justify-content-between"
        >
          <h1
            style="
              font-weight: 900;
              font-size: 52px;
              align-self: flex-start;
              color: #00AEFF;
            "
          >
            FindSign
          </h1>
          <br>
          <p class="fs-5" style="width: 80%; text-align: justify">
            Olá! Sejam bem-vindos ao sítio web do Projeto FindSing, uma ferramenta de busca de conteúdos acessíveis em Libras, do Centro Universitário de Ensino Superior do Distrito Federal - UDF.
          </p>
          <br />

          <button
            @click="navigatoToFindSign"
            class="btn rounded-pill px-4 py-3 mt-4 fw-bold" style="background-color: #00AEFF"
          >
            Clique aqui e saiba mais
            <i class="bi bi-arrow-down-right-square ms-3"></i>
          </button>
        </div>

        <div class="custom-iframe">
          <iframe
            src="https://www.youtube.com/embed/yWNinj-n3R8"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
const router = useRouter();

const navigatoToFindSign = () => {
  router.push("/findsign");
};

useHead({
  title: "Home",
});
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
.btn-dark:hover {
  background-color: #444444 !important;
}

.custom-iframe iframe {
  height: 300px;
  width: 500px;
}
</style>
