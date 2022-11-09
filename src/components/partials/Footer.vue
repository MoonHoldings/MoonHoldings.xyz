<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const currentRoute = ref('')

onMounted(() => {
  currentRoute.value = location.pathname;
})

const goPage = (routePage) => {
  mixpanel.track('Footer goPage', {
    'route': routePage
  })
  currentRoute.value = routePage
  router.push(routePage)
}
</script>

<template>
  <div class="footer">
    <div
      :class="currentRoute == '/crypto' ? 'element element-active' : 'element element-normal'"
      @click="goPage('/crypto')"
    >
      <img class="image" src="/svg/icon-crypto-white.svg" alt="crypto" />
      <div class="label">Crypto</div>
    </div>
    <div
      :class="currentRoute.startsWith('/nfts') ? 'element element-active' : 'element element-normal'"
      @click="goPage('/nfts/portfolio')"
    >
      <img class="image" src="/svg/icon-nfts-white.svg" alt="nfts" />
      <div class="label">NFTs</div>
    </div>
    <div
      :class="currentRoute == '/calendar' ? 'element element-active' : 'element element-normal'"
      @click="goPage('/calendar')"
    >
      <img class="image" src="/svg/icon-calendar-white.svg" alt="calendar" />
      <div class="label">Calendar</div>
    </div>
    <div
      :class="currentRoute == '/ranks' ? 'element element-active' : 'element element-normal'"
      @click="goPage('/ranks')"
    >
      <img class="image" src="/svg/icon-ranks-white.svg" alt="ranks" />
      <div class="label">Ranks</div>
    </div>
    <div
      :class="currentRoute == '/insights' ? 'element element-active' : 'element element-normal'"
      @click="goPage('/insights')"
    >
      <img class="image" src="/svg/icon-insights-white.svg" alt="insights" />
      <div class="label">Insights</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/footer.scss';
</style>