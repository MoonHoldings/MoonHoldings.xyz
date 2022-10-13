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
      <a href="https://twitter.com/moonholdingsxyz" target="_blank">Twitter</a> | <a href="https://discord.gg/JPPvAf5BMW" target="_blank">Discord</a>
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
  position: absolute;
  bottom: 2rem;
  width: 100%;
  text-align: center;
  font-size: 2rem;
  color: #fff;

  a {
    color: var(--green);
  }
}

/* for screens that are at least 320 pixels wide but less than or equal to 640 pixels wide */
@media screen and (min-width:320px) and (max-width:640px) {
  .homepage {
    width: auto;
    max-width: 640px;
    min-width: 390px;
  }
}
</style>
