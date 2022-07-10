<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
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
