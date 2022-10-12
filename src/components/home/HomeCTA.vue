<script setup>
import { SIGN_UP, SIGN_UP_PATH, TAG_LINE, TRACK_MANAGE_ANALYZE } from '../../constants'
import PrimaryBtn from '@/components/partials/PrimaryBtn.vue'
</script>

<template>
  <main>
    <div class="moon-cta">
      <section class="tagline">
        <h2>{{TAG_LINE}}</h2>
        <h1>{{TRACK_MANAGE_ANALYZE}}</h1>
        <PrimaryBtn :copy="SIGN_UP" :url="SIGN_UP_PATH" />
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
  margin-top: 380px;
  display: grid;
  justify-content: space-evenly;
  justify-items: center;
  align-content: space-evenly;
  align-items: center;
}

@media (max-width: 1400px) {
  .tagline {
    margin-top: 240px;
  }
}

@media (max-width: 1100px) {
  .tagline {
    margin-top: 200px;
  }

  h1 {
    font-size: 5rem;
  }
}

@media (max-width: 990px) {
  .tagline {
    margin-top: 120px;
  }

  h1 {
    font-size: 5rem;
  }
}

@media screen and (min-width:320px) and (max-width:640px) {
  .tagline {
    margin-top: 240px;
  }

  h1 {
    font-size: 4rem;
    line-height: 4rem;
  }

  h2 {
    font-size: 2.5rem;
  }
}

</style>
