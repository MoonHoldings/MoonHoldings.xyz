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
  </div>
</template>

<style scoped>
.homepage {
  display: grid;
  height: 100%;
  background-image: linear-gradient(to bottom, var(--pink), var(--purple));
}
</style>
