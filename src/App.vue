<script setup>
// import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import SuccessAlert from '@/components/partials/SuccessAlert.vue'
import ErrorAlert from '@/components/partials/ErrorAlert.vue'
import { useUtilStore } from '@/stores/util'

const utilStore = useUtilStore()
</script>

<template>
  <transition
    mode="out-in"
    enter-active-class="animate__animated animate__fadeInLeftBig"
    leave-active-class="animate__animated animate__fadeOutRightBig"
  >
    <SuccessAlert v-if="utilStore.showSuccessAlert" />
  </transition>
  <transition
    mode="out-in"
    enter-active-class="animate__animated animate__fadeInLeftBig"
    leave-active-class="animate__animated animate__fadeOutRightBig"
  >
    <ErrorAlert v-if="utilStore.errorSignup || utilStore.errorLogin" />
  </transition>

  <RouterView />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;400;800&display=swap');
@import '@/sass';

html,
body {
  height: 100%;
}

#app {
  max-width: auto;
  height: 100%;
  margin: 0 auto;
  font-family: 'Inconsolata', monospace;
  font-weight: normal;
}

strong {
  font-weight: 800;
}
</style>
