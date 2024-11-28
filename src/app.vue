<template>
  <div class="layout-wrapper">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

  </div>
</template>

<script setup>
const userStore = piniaUserStore()

onMounted(() => {
  userStore.checkUserToken()
})
</script>
