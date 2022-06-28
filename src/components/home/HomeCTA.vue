<script setup>
import GetStartedBtn from '@/components/partials/GetStartedBtn.vue'
</script>

<template>
  <main>
    <div class="moon-cta">
      <section class="tagline">
        <h1>The Bold Portfolio Tracker For Brave Crypto Investors</h1>
        <h2>Start / continue your crypto investing journey with us.</h2>
        <GetStartedBtn />
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 400px;
}
h1 {
  width: 500px;
  font-size: 2.25em;
  font-weight: 800;
  line-height: 1.2em;
}
h2 {
  margin: 2em 0;
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
