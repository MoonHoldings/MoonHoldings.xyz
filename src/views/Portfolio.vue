<script setup>
import { ref, watch, onMounted } from 'vue'
import Header from '@/components/partials/Header.vue'
import {
  PORTFOLIO_WELCOME_HEADER,
  PORTFOLIO_WELCOME_MSG1,
  PORTFOLIO_WELCOME_MSG2,
} from '@/constants/copy'
import { useCoinStore } from '@/stores/coin'

const coinStore = useCoinStore()
const coinNameInput = ref('')
const searchedCoins = ref([])

onMounted(async () => {
  await coinStore.fetchCoins()
  coinStore.getCoins()
})

watch(coinNameInput, async () => {
  if (coinNameInput.value.length >= 2) {
    coinStore.coins.forEach((coin) => {
      const coinChar = coin.id.slice(0, coinNameInput.value.length)
      const coinNameCap = coinNameInput.value.toUpperCase()
      if (coinChar === coinNameCap) {
        searchedCoins.value.push(coin)
      }
    })
  }
  if (coinNameInput.value.length === 0) {
    searchedCoins.value = []
  }
})
</script>

<template>
  <Header />
  <div class="portfolio">
    <div class="portfolio__coin-search">
      <input
        v-model="coinNameInput"
        type="text"
        placeholder="Search Coins"
      />
      <span>&lt; Get Started</span>
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutLeft"
      >
        <div class="dropdown-list" v-if="searchedCoins.length !== 0">
          <ul>
            <li v-for="coin in searchedCoins">
              <button>{{ coin.id }} - {{ coin.name }}</button>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="portfolio__welcome-msg">
      <h1>{{ PORTFOLIO_WELCOME_HEADER }}</h1>
      <p>
        {{ PORTFOLIO_WELCOME_MSG1 }} <br />
        {{ PORTFOLIO_WELCOME_MSG2 }}
      </p>
      <div class="monster-div">
        <img src="/svg/icon-monster-friend.svg" alt="monster friend" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.portfolio {
  position: relative;
  color: #ffffff;
  padding: 1em;
  display: inline-block;
  min-height: 100vh;
  min-width: 100vw;
  padding: 96px 26px 26px 26px;
  background-image: linear-gradient(to bottom, var(--pink), var(--purple));

  &__coin-search {
    input {
      min-height: 48px;
      min-width: 220px;
      background-color: rgba(255, 255, 255, 0.25);
      border: 1px solid #ffffff;
      outline: none;
      font-size: 17px;
      padding-left: 12px;
      color: #ffffff;
      box-shadow: 0 3px 10px rgba(255, 255, 255, 0.2);
      margin-right: 15px;
    }
    ::placeholder {
      color: #ffffff;
    }
    span {
      font-size: 17px;
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
  &__welcome-msg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    h1 {
      font-size: 40px;
      font-weight: 500;
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
