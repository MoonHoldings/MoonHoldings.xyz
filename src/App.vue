<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;400;800&display=swap");
@import "@/assets/base.css";

#app {
  max-width: 1440px;
  margin: 0 auto;
  font-family: "Inconsolata", monospace;
  font-weight: normal;
}

@media (min-width: 1024px) {
  body {
    display: flex;
  }

  #app {
    min-width: 1440px;
    /* display: grid;
    grid-template-columns: 1fr 1fr; */
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
