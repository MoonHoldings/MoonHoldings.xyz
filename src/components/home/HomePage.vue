<script setup>
import HomeHeader from './HomeHeader.vue'
import HomeBanner from './HomeBanner.vue'
import HomeCTA from './HomeCTA.vue'
</script>

<template>
  <div class="homepage">
    <HomeHeader />
    <HomeBanner />
    <HomeCTA />
    <footer>
      <a href="">Twitter</a> | <a href="">Discord</a>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.homepage {
  display: grid;
  height: 100vh;
  background-image: linear-gradient(to bottom, var(--pink), var(--purple));
}

footer {
  width: 100%;
  text-align: center;
  font-size: 2rem;
  color: #fff;

  a {
    color: var(--green);
  }
}

@media (max-width: 640px) {
  .homepage {
    width: 640px;
    max-width: 640px;
    min-width: 640px;
  }
}
</style>
