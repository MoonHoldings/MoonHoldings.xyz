<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

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
      <div class="left-side">
        <div class="logo">
          <img
            src="/svg/moon-holdings-logo-black.svg"
            alt="moonholdings logo"
          />
          <span>MoonHoldings</span>
        </div>
      </div>

      <div class="item-container">
        <div
          :class="currentRoute == 'crypto' ? 'item-logo item-logo__active' : 'item-logo'"
          @click="goPage('crypto')"
        >
          <img
            src="/svg/icon-crypto-black.svg"
            alt="crypto logo"
          />
          <span>CRYPTO</span>
        </div>

        <div
          :class="currentRoute == 'nfts/collection' || currentRoute == 'nfts/lend-borrow' ? 'item-sub item-sub__active' : 'item-sub'"
          @click="goPage('nfts/collection')"
        >
          <img
            src="/svg/icon-nfts.svg"
            alt="nfts logo"
          />
          <span>NFTS</span>
        </div>

        <div
          v-if="currentRoute == 'nfts/collection' || currentRoute == 'nfts/lend-borrow'"
          :class="currentRoute == 'nfts/collection' ? 'item-sub-menu item-sub-menu__active' : 'item-sub-menu'"
          @click="goPage('nfts/collection')"
        >
          Collections
        </div>

        <div
          v-if="currentRoute == 'nfts/collection' || currentRoute == 'nfts/lend-borrow'"
          :class="currentRoute == 'nfts/lend-borrow' ? 'item-sub-menu item-sub-menu__active' : 'item-sub-menu'"
          @click="goPage('nfts/lend-borrow')"
        >
          Lend & Borrow
        </div>
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

    .left-side {
      display: flex;
      margin-top: 16px;
      .logo {
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
    }
    .item-container {
      display: flex;
      flex-direction: column;
      margin-top: 56px;
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
        font-size: 16px;
        font-weight: 300;
        line-height: 34px;
        cursor: pointer;

        &__active {
          color: #C74FF9;
          font-weight: 700;
        }
      }
    }
  }
}
</style>