<script setup>
import { watch, ref } from 'vue'
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
} from '@/constants/copy';

const route = useRoute()
const router = useRouter()
const currentRoute = ref('')
const isSidebar = ref(false)

const goPage = (routePage) => {
  currentRoute.value = routePage
  router.push(`/${routePage}`)
}

watch(route, (prev, present) => {
  isSidebar.value = route.fullPath !== "/" && route.fullPath !== "/login" && route.fullPath !== "/sign-up" && !useUserStore.gotten_user
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
        :class="currentRoute == 'crypto' ? 'item-logo item-logo__active' : 'item-logo'"
        @click="goPage('crypto')"
      >
        <img v-if="currentRoute == 'crypto'" src="/svg/icon-circle-fill.svg" alt="crypto logo" />
        <img v-else src="/svg/icon-circle-line.svg" alt="crypto logo" />
        <span>{{ CRYPTO }}</span>
      </div>

      <div
        :class="currentRoute == 'nfts/collection' || currentRoute == 'nfts/lend-borrow' ? 'item-logo item-logo__active' : 'item-logo'"
        @click="goPage('nfts/collection')"
      >
        <img v-if="currentRoute == 'nfts/collection' || currentRoute == 'nfts/lend-borrow'" src="/svg/icon-circle-fill.svg" alt="nfts logo" />
        <img v-else src="/svg/icon-circle-line.svg" alt="nfts logo" />
        <span>{{ NFTS }}</span>
      </div>

      <div
        v-if="currentRoute == 'nfts/collection' || currentRoute == 'nfts/lend-borrow'"
        :class="currentRoute == 'nfts/collection' ? 'item-sub-menu item-sub-menu__active' : 'item-sub-menu'"
        @click="goPage('nfts/collection')"
      >
        {{ COLLECTIONS }}
      </div>

      <div
        v-if="currentRoute == 'nfts/collection' || currentRoute == 'nfts/lend-borrow'"
        :class="currentRoute == 'nfts/lend-borrow' ? 'item-sub-menu item-sub-menu__active' : 'item-sub-menu'"
        @click="goPage('nfts/lend-borrow')"
      >
        {{ LEND_BORROW }}
      </div>

      <div
        :class="currentRoute == 'calendar' ? 'item-logo item-logo__active' : 'item-logo'"
        @click="goPage('calendar')"
      >
        <img v-if="currentRoute == 'calendar'" src="/svg/icon-circle-fill.svg" alt="calendar logo" />
        <img v-else src="/svg/icon-circle-line.svg" alt="calendar logo" />
        <span>{{ CALENDAR }}</span>
      </div>

      <div
        :class="currentRoute == 'coin-swap' ? 'item-logo item-logo__active' : 'item-logo'"
        @click="goPage('coin-swap')"
      >
        <img v-if="currentRoute == 'coin-swap'" src="/svg/icon-circle-fill.svg" alt="coin-swap logo" />
        <img v-else src="/svg/icon-circle-line.svg" alt="coin-swap logo" />
        <span>{{ COIN_SWAP }}</span>
      </div>

      <div
        :class="currentRoute == 'ranks' ? 'item-logo item-logo__active' : 'item-logo'"
        @click="goPage('ranks')"
      >
        <img v-if="currentRoute == 'ranks'" src="/svg/icon-circle-fill.svg" alt="ranks logo" />
        <img v-else src="/svg/icon-circle-line.svg" alt="ranks logo" />
        <span>{{ RANKS }}</span>
      </div>

      <div
        :class="currentRoute == 'insights' ? 'item-logo item-logo__active' : 'item-logo'"
        @click="goPage('insights')"
      >
        <img v-if="currentRoute == 'insights'" src="/svg/icon-circle-fill.svg" alt="insights logo" />
        <img v-else src="/svg/icon-circle-line.svg" alt="insights logo" />
        <span>{{ INSIGHTS }}</span>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.side-bar {
  width: 200px;
  border-right: 1px solid #6D2E46;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #f0f6f0 0%, #cecece 100%);
  &__pink-bar {
    height: 10px;
    background: #6D2E46;
  }
  &__main {
    margin-left: 20px;
    margin-right: 8px;
    min-height: 72px;
    .logo {
      margin-top: 16px;
      margin-bottom: 56px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      img {
        height: 28px;
        margin-right: 10px;
      }
      span {
        position: relative;
        bottom: 5px;
      }
    }
    .item-logo {
      margin-bottom: 24px;
      font-size: 18px;
      font-weight: 400;
      cursor: pointer;

      &__active {
        color: #C74FF9;
        font-weight: 700;
      }
      img {
        height: 21px;
        margin-right: 10px;
      }
      span {
        position: relative;
        bottom: 5px;
      }
    }
    .item-sub {
      font-size: 18px;
      font-weight: 400;
      cursor: pointer;
      &__active {
        color: #C74FF9;
        font-weight: 700;
      }
      img {
        height: 21px;
        margin-right: 10px;
      }
      span {
        position: relative;
        bottom: 5px;
      }
    }
    .item-sub-menu {
      margin-left: 32px;
      margin-bottom: 32px;
      font-size: 16px;
      font-weight: 300;
      line-height: 0;
      cursor: pointer;
      &__active {
        color: #C74FF9;
        font-weight: 700;
      }
    }
  }
}
</style>