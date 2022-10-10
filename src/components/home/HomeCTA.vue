<script setup>
import { GET_STARTED, SIGN_UP_PATH, TAG_LINE, TRACK_COMPARE_COMPETE } from '../../constants'
import PrimaryBtn from '@/components/partials/PrimaryBtn.vue'
</script>

<template>
  <main>
    <div class="moon-cta">
      <section class="tagline">
        <h2>{{TAG_LINE}}</h2>
        <h1>{{TRACK_COMPARE_COMPETE}}</h1>
        <PrimaryBtn :copy="GET_STARTED" :url="SIGN_UP_PATH" />
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 400px;
}
h1 {
  // width: 640px;
  margin-bottom: 1em;
  font-size: 6em;
  font-weight: 800;
  line-height: 1.3em;
}
h2 {
  // margin: 2em 0;
  font-size: 4em;
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
