<script setup>
import { GET_STARTED, SIGN_UP_PATH, TAG_LINE, TRACK_MANAGE_ANALYZE } from '../../constants'
import PrimaryBtn from '@/components/partials/PrimaryBtn.vue'
</script>

<template>
  <main>
    <div class="moon-cta">
      <section class="tagline">
        <h2>{{TAG_LINE}}</h2>
        <h1>{{TRACK_MANAGE_ANALYZE}}</h1>
        <PrimaryBtn :copy="GET_STARTED" :url="SIGN_UP_PATH" />
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  top: -30rem;
}

h1 {
  margin-bottom: 8rem;
  font-size: 6rem;
  font-weight: 800;
  line-height: 1.3rem;
}

h2 {
  margin-bottom: 4rem;
  font-size: 4rem;
}

.moon-cta {
  display: grid;
  margin-top: 5rem;
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

@media (max-width: 1100px) {
  h1 {
    font-size: 5rem;
  }
  h2 {
    font-size: 3rem;
  }
}

@media (max-width: 800px) {
  .tagline {
    justify-items: stretch;
  }

  button {
    height: 6rem;
  }
}

@media (max-width: 640px) {
  .moon-cta {
    width: auto;
    max-width: 80%;
  }

  main {
    top: -20rem;
  }

  h1 {
    font-size: 4rem;
  }

  h2 {
    padding: 1rem;
  }

  button {
    margin: 0 4rem;
  }
}
</style>
