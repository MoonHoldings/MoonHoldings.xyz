<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const currentRoute = ref('');

  const goPage = (routePage) => {
    currentRoute.value = routePage;
    router.push(`/${routePage}`);
  };
</script>

<template>
  <div class="side-bar">
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
          class="item-logo"
          @click="goPage('crypto')"
          :style="currentRoute == 'crypto' ? 'color: #C74FF9 !important; font-weight: 700;' : 'color: black; font-weight: 400;'"
        >
          <img
            src="/svg/moon-holdings-logo-black.svg"
            alt="moonholdings logo"
          />
          <span>CRYPTO</span>
        </div>

        <div
          class="item-sub"
          @click="goPage('nfts/collection')"
          :style="currentRoute == 'nfts/collection' || currentRoute == 'nfts/lend-borrow' ? 'color: #C74FF9 !important; font-weight: 700;' : 'color: black; font-weight: 400;'"
        >
          <img
            src="/svg/icon-diamond.svg"
            alt="moonholdings logo"
          />
          <span>NFTS</span>
        </div>

        <div
          v-if="currentRoute == 'nfts/collection' || currentRoute == 'nfts/lend-borrow'"
          class="item-sub-menu"
          @click="goPage('nfts/collection')"
          :style="currentRoute == 'nfts/collection' ? 'color: #C74FF9 !important; font-weight: 700;' : 'color: black; font-weight: 300;'"
        >
          Collections
        </div>

        <div
          v-if="currentRoute == 'nfts/collection' || currentRoute == 'nfts/lend-borrow'"
          class="item-sub-menu"
          @click="goPage('nfts/lend-borrow')"
          :style="currentRoute == 'nfts/lend-borrow' ? 'color: #C74FF9 !important; font-weight: 700;' : 'color: black; font-weight: 300;'"
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
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
        margin-bottom: 24px;
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
        font-weight: 700;
        cursor: pointer;
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
        font-size: 16px;
        font-weight: 700;
        line-height: 34px;
        margin-left: 32px;
        cursor: pointer;
      }
    }
  }
}
</style>