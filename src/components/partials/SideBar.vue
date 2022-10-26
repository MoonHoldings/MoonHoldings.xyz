<script setup>
import { watch, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import {
  MOONHOLDINGS,
  CRYPTO,
  NFTS,
  COLLECTIONS,
  LEND_BORROW,
  CALENDAR,
  COIN_SWAP,
  RANKS,
  INSIGHTS
} from '@/constants/copy'

const route = useRoute()
const router = useRouter()
const currentRoute = ref('')
const isSidebar = ref(false)

const goPage = (routePage) => {
  currentRoute.value = routePage
  router.push(routePage)
}

onMounted(() => {
  currentRoute.value = location.pathname;
})

watch(route, (prev, present) => {
  isSidebar.value = route.fullPath
    !== "/" && route.fullPath
    !== "/login" && route.fullPath
    !== "/sign-up" && route.fullPath
    !== "/reset-password" && route.fullPath
    !== "/privacy-policy" && route.fullPath
    !== "/terms-of-service" && route.fullPath
    !== "/newsletter-mail" && route.fullPath
    && !useUserStore.gotten_user
})

</script>

<template>
  <div v-if="isSidebar" class="side-bar">
    <div class="side-bar__pink-bar" />
    <div class="side-bar__main">
      <div class="logo">
        <img src="/svg/moon-holdings-logo-black.svg" alt="moonholdings logo" />
        <span>{{ MOONHOLDINGS }}</span>
      </div>

      <div
        :class="currentRoute == '/crypto' ? 'item-logo item-logo__active' : 'item-logo'"
        @click="goPage('/crypto')"
      >
        <img v-if="currentRoute == '/crypto'" src="/svg/icon-circle-fill.svg" alt="crypto logo" />
        <img v-else src="/svg/icon-circle-line.svg" alt="crypto logo" />
        <span>{{ CRYPTO }}</span>
      </div>

      <div
        :class="currentRoute == '/nfts/collections' || currentRoute == '/nfts/lend-borrow' ? 'item-logo item-logo__active' : 'item-logo'"
        @click="goPage('/nfts/collections')"
      >
        <img v-if="currentRoute == '/nfts/collections' || currentRoute == '/nfts/lend-borrow'" src="/svg/icon-circle-fill.svg" alt="nfts logo" />
        <img v-else src="/svg/icon-circle-line.svg" alt="nfts logo" />
        <span>{{ NFTS }}</span>
      </div>

      <div
        v-if="currentRoute == '/nfts/collections' || currentRoute == '/nfts/lend-borrow'"
        :class="currentRoute == '/nfts/collections' ? 'item-sub-menu item-sub-menu__active' : 'item-sub-menu'"
        @click="goPage('/nfts/collections')"
      >
        {{ COLLECTIONS }}
      </div>

      <div
        v-if="currentRoute == '/nfts/collections' || currentRoute == '/nfts/lend-borrow'"
        :class="currentRoute == '/nfts/lend-borrow' ? 'item-sub-menu item-sub-menu__active' : 'item-sub-menu'"
        @click="goPage('/nfts/lend-borrow')"
      >
        {{ LEND_BORROW }}
      </div>

      <div
        :class="currentRoute == '/calendar' ? 'item-logo item-logo__active' : 'item-logo'"
        @click="goPage('/calendar')"
      >
        <img v-if="currentRoute == '/calendar'" src="/svg/icon-circle-fill.svg" alt="calendar logo" />
        <img v-else src="/svg/icon-circle-line.svg" alt="calendar logo" />
        <span>{{ CALENDAR }}</span>
      </div>

      <div
        :class="currentRoute == '/coin-swap' ? 'item-logo item-logo__active' : 'item-logo'"
        @click="goPage('/coin-swap')"
      >
        <img v-if="currentRoute == '/coin-swap'" src="/svg/icon-circle-fill.svg" alt="coin-swap logo" />
        <img v-else src="/svg/icon-circle-line.svg" alt="coin-swap logo" />
        <span>{{ COIN_SWAP }}</span>
      </div>

      <div
        :class="currentRoute == '/ranks' ? 'item-logo item-logo__active' : 'item-logo'"
        @click="goPage('/ranks')"
      >
        <img v-if="currentRoute == '/ranks'" src="/svg/icon-circle-fill.svg" alt="ranks logo" />
        <img v-else src="/svg/icon-circle-line.svg" alt="ranks logo" />
        <span>{{ RANKS }}</span>
      </div>

      <div
        :class="currentRoute == '/insights' ? 'item-logo item-logo__active' : 'item-logo'"
        @click="goPage('/insights')"
      >
        <img v-if="currentRoute == '/insights'" src="/svg/icon-circle-fill.svg" alt="insights logo" />
        <img v-else src="/svg/icon-circle-line.svg" alt="insights logo" />
        <span>{{ INSIGHTS }}</span>
      </div>

      <div class="social">
        <div class="item">
          <img src="/svg/icon-twitter.svg" alt="twitter logo" />
          <a class="link" href="https://twitter.com/moonholdingsxyz" target="_blank">
            Follow us
          </a>
        </div>
        <div class="item">
          <img src="/svg/icon-discord.svg" alt="discord logo" />
          <a class="link" href="http://discord.gg/JPPvAf5BMW" target="_blank">
            Hang with us
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import '@/sass/side-bar.scss';
</style>