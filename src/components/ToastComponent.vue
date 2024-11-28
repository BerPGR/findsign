<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div 
      id="liveToast" 
      class="toast" 
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
    >
      <div class="toast-header"
        :class="{
          'bg-success': toastStore.resultado == 'success',
          'bg-warning': toastStore.resultado == 'warning',
          'bg-danger': toastStore.resultado == 'danger'
        }"
      >
        <strong class="me-auto text-white">FindSign</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body" :class="{
        'bg-success-subtle': toastStore.resultado == 'success',
        'bg-warning-subtle': toastStore.resultado == 'warning',
        'bg-danger-subtle': toastStore.resultado == 'danger'
      }">
        {{ toastStore.mensagem }}
      </div>
    </div>
  </div>
</template>

<script setup>
const toastStore = piniaToastStore()
</script>
