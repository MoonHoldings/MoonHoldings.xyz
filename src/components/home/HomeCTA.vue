<script setup>
import { GET_STARTED, SIGN_UP_PATH } from '../../constants'
import PrimaryBtn from '@/components/partials/PrimaryBtn.vue'
</script>

<template>
  <main>
    <div class="moon-cta">
      <section class="tagline">
        <h1>The Bold Portfolio Tracker For Brave Crypto Investors</h1>
        <h2>Start or continue your crypto investing journey with us.</h2>
        <PrimaryBtn :copy='GET_STARTED' :url='SIGN_UP_PATH' />
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 400px;
}
h1 {
  width: 640px;
  font-size: 3.6em;
  font-weight: 800;
  line-height: 1.3em;
}
h2 {
  margin: 2em 0;
  font-size: 2em;
}
.moon-cta {
  display: grid;
  margin-top: 5em;
  width: auto;
  height: 200px;
  color: white;
  text-align: center;
}
.tagline {
  display: grid;
  justify-content: space-evenly;
  justify-items: center;
  align-content: space-evenly;
  align-items: center;
}
</style>
