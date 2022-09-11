<script setup>
import { ref, watch, onMounted } from 'vue'
import Header from '@/components/partials/Header.vue'
import {
  PORTFOLIO_GET_STARTED,
  PORTFOLIO_WELCOME_HEADER,
  PORTFOLIO_WELCOME_MSG1,
  PORTFOLIO_WELCOME_MSG2,
} from '@/constants/copy'
import { useCoinStore } from '@/stores/coin'

const coinStore = useCoinStore()
const fetchedCoins = ref([])
const coinNameInput = ref('')
const searchedCoins = ref([])
const showWelcome = ref(false)

onMounted(async () => {
  //
})

watch([coinNameInput, fetchedCoins], () => {
  //   fn()
})
// const fn = () => {
//   if (coinNameInput.value.length >= 2 && fetchedCoins.value.length !== 0) {
//     const coinNameInputCap = coinNameInput.value.toUpperCase()

//     const coinsMapped = fetchedCoins.value.map((coin) => {
//       const coinIdChar = coin.id.slice(0, coinNameInput.value.length)

//       if (coinIdChar === coinNameInputCap) return coin
//     })
//     searchedCoins.value = coinsMapped
//   }
//   if (coinNameInput.value.length === 0) {
//     searchedCoins.value = []
//   }
// }
const singleCoinSearch = async () => {
  const response = await coinStore.getSingleCoin('BTC')
  console.log(response)
}
</script>

<template>
  <Header />
  <div class="portfolio">
    <div class="portfolio__entries">
      <div class="portfolio__coin-search">
        <input v-model="coinNameInput" type="text" placeholder="Search Coins" />
        <!-- <button @click="singleCoinSearch">Search</button> -->
        <div class="sort-text">Portfolio display style:</div>
        <div class="sort-btns">
          <button class="grid-btn">
            <img src="/svg/icon-grid.svg" alt="grid icon" />
          </button>
          <button class="list-btn">
            <img src="/svg/icon-list.svg" alt="list icon" />
          </button>
        </div>
        <!-- <transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutLeft"
        >
        <div class="dropdown-list" v-if="searchedCoins.length !== 0">
          <ul>
            <li v-for="coin in searchedCoins" :key="coin.id">
              <button>{{ coin.id }} - {{ coin.name }}</button>
            </li>
          </ul>
        </div>
        </transition> -->
      </div>
      <!-- Coins -->
      <div class="portfolio__coins">
        <div v-for="(e, i) in 10" :key="i" class="portfolio__coin-box">
          <div class="surface"></div>
          <div class="shadow-common doge-shadow"></div>
        </div>
      </div>
    </div>
    <div class="portfolio__stats">
      <div class="portfolio__total-value">
        <div class="value">
          <div class="value-number">
            <span class="s1">$57,599.55</span> <span class="s2">+5.35%</span>
            <small>24hr</small>
          </div>
        </div>
        <div class="value-currency"></div>
      </div>
    </div>

    <div v-if="showWelcome" class="portfolio__welcome-msg">
      <h1>{{ PORTFOLIO_WELCOME_HEADER }}</h1>
      <p>
        {{ PORTFOLIO_WELCOME_MSG1 }} <br />
        {{ PORTFOLIO_WELCOME_MSG2 }}
      </p>
      <div class="monster-div">
        <img src="/gif/monster-friend.gif" alt="monster friend" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/shadows.scss';
.portfolio {
  padding: 1em;
  display: grid;
  grid-template-columns: 60% 40%;
  color: var(--ash);
  min-height: 100vh;
  min-width: 100%;
  padding: 110px 41px 41px 41px;
  background: linear-gradient(180deg, #f0f6f0 0%, #cecece 100%);

  // ============== Entries ===============
  &__entries {
    padding-right: 30px;
  }

  &__coin-search {
    display: flex;
    align-items: center;
    margin-bottom: 58px;

    input {
      min-height: 44px;
      min-width: 240px;
      background: rgba(182, 75, 212, 0.033);
      border: 1px solid var(--pink);
      box-shadow: 0px 1px 10px 1px rgba(182, 75, 212, 0.13);
      -webkit-box-shadow: 0px 1px 10px 1px rgba(183, 75, 212, 0.16);
      -moz-box-shadow: 0px 1px 10px 1px rgba(183, 75, 212, 0.16);
      border-radius: 2px;
      outline: none;
      font-size: 18px;
      padding-left: 12px;
      margin-right: 30px;
      font-family: 'Inter', monospace;
    }
    ::placeholder {
      color: inherit;
    }
    .sort-text {
      font-size: 14px;
      margin-right: 7px;
    }
    .sort-btns {
      button {
        background: none;
        border: none;
        outline: none;
        img {
          height: 30px;
        }
      }
    }
    .dropdown-list {
      width: 380px;
      min-height: 150px;
      background-color: #fff;
      ul {
        padding: 7px 0;
        list-style: none;
        li {
          button {
            width: 100%;
            text-align: left;
            padding: 5px 10px;
            font-size: 16px;
            background: none;
            border: none;
            outline: none;
          }
        }
      }
    }
  }

  &__coins {
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
  }

  &__coin-box {
    position: relative;
    .surface {
      position: relative;
      border: 1px solid #000;
      border-radius: 2px;
      background-color: #ffffff;
      width: 180px;
      height: 180px;
      z-index: 6;
    }
  }

  // ============ Stats =============
  &__stats {
  }

  &__total-value {
    .value {
      background-color: #3f473f;
      min-height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-family: 'Inconsolata', monospace;

      &-number {
        position: relative;
        .s1 {
          font-size: 38px;
          color: #fff;
          margin-right: 15px;
        }
        .s2 {
          font-size: 38px;
          color: var(--green);
        }
        small {
          // border: 1px solid magenta;
          position: absolute;
          bottom: 0;
          margin-left: 15px;
          font-size: 14px;
          line-height: 42px;
          color: #fff;
        }
      }
    }
  }

  // ========== Welcome ===========
  &__welcome-msg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    h1 {
      font-size: 45px;
      font-weight: 600;
    }
    p {
      font-size: 28px;
    }
    .monster-div {
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translateX(100%) translateY(130%);
      img {
        height: 90px;
      }
    }
  }
}
</style>
