<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const currentRoute = ref('')
const isSidebar = ref(false)

onMounted(() => {
  currentRoute.value = location.pathname
})

const goPage = routePage => {
  mixpanel.track('Footer goPage', {
    route: routePage,
  })
  currentRoute.value = routePage
  router.push(routePage)
}

watch(route, (prev, present) => {
  currentRoute.value = route.fullPath

  isSidebar.value =
    route.fullPath !== '/' &&
    route.fullPath !== '/login' &&
    route.fullPath !== '/sign-up' &&
    route.fullPath !== '/forgot-password' &&
    route.name !== 'resetPassword' &&
    route.fullPath !== '/privacy-policy' &&
    route.fullPath !== '/terms-of-service' &&
    route.fullPath !== '/newsletter-mail' &&
    route.fullPath &&
    !useUserStore.gotten_user
})
</script>

<template>
  <div class="footer" v-if="isSidebar">
    <div
      :class="
        currentRoute == '/crypto'
          ? 'element element-active'
          : 'element element-normal'
      "
      @click="goPage('/crypto')"
    >
      <img class="image" src="/svg/icon-crypto-white.svg" alt="crypto" />
      <div class="label">Crypto</div>
    </div>
    <div
      :class="
        currentRoute.startsWith('/nfts')
          ? 'element element-active'
          : 'element element-normal'
      "
      @click="goPage('/nfts/portfolio')"
    >
      <img class="image" src="/svg/icon-nfts-white.svg" alt="nfts" />
      <div class="label">NFTs</div>
    </div>
    <div
      :class="
        currentRoute == '/calendar'
          ? 'element element-active'
          : 'element element-normal'
      "
      @click="goPage('/calendar')"
    >
      <img class="image" src="/svg/icon-calendar-white.svg" alt="calendar" />
      <div class="label">Calendar</div>
    </div>
    <div
      :class="
        currentRoute == '/ranks'
          ? 'element element-active'
          : 'element element-normal'
      "
      @click="goPage('/ranks')"
    >
      <img class="image" src="/svg/icon-ranks-white.svg" alt="ranks" />
      <div class="label">Ranks</div>
    </div>
    <div
      :class="
        currentRoute == '/insights'
          ? 'element element-active'
          : 'element element-normal'
      "
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
