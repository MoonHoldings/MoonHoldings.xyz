<script setup>
import { onMounted, watch } from 'vue'
import { useRoute, RouterView } from 'vue-router'

import SuccessAlert from '@/components/partials/SuccessAlert.vue'
import ErrorAlert from '@/components/partials/ErrorAlert.vue'
import SideBar from '@/components/partials/SideBar.vue'
import Footer from '@/components/partials/Footer.vue'
import { useUtilStore } from '@/stores/util'
import { useCoinStore } from '@/stores/coin'

const route = useRoute()
const utilStore = useUtilStore()
const coinStore = useCoinStore()

watch(route, (prev, present) => {
  utilStore.mutate_errorToggle(false)
  utilStore.mutate_errorMessage('')
  utilStore.mutate_showSuccessAlert(false)
  utilStore.mutate_successMessage('')
})

onMounted(async () => {
  const coinStorage = localStorage.getItem('MoonCoins')
  if (!coinStorage) {
    await coinStore.getAllCoinsBrowser()
  }
})
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
    <ErrorAlert v-if="utilStore.errorToggle" />
  </transition>
  <SideBar />
  <RouterView />
  <Footer />
</template>

<style lang="scss">
@import url('https://rsms.me/inter/inter.css');
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;400;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;800&display=swap');
@import '@/sass';

.font-45 {
  font-size: 4.5rem !important;
}
.font-40 {
  font-size: 4rem !important;
}
.font-35 {
  font-size: 3.5rem !important;
}
.font-25 {
  font-size: 2.5rem !important;
}
.font-15 {
  font-size: 1.5rem !important;
}
.font-14 {
  font-size: 1.4rem !important;
}

body,
html {
  margin: 0;
  padding: 0;
  background: #F0F6F0;
}
* {
  box-sizing: border-box;
}

#app {
  max-width: auto;
  margin: 0 auto;
  font-family: 'Inconsolata', monospace;
  font-weight: normal;
}

strong {
  font-weight: 800;
}
</style>

<style scoped>
:global(.swv-button) {
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 4px;
  background: #5B218F;
  font-size: 16px;
  font-weight: 400;
  font-family: "Inter";
  line-height: 20px;
}
:global(.swv-dropdown) {
  width: 100%;
}
:global(.swv-modal-wrapper) {
  border-radius: 0;
}
:global(.swv-modal-collapse-button) {
  border-radius: 0;
}
</style>
