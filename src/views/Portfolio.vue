<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import Header from '@/components/partials/Header.vue'
import CoinBox from '@/components/partials/CoinBox.vue'
import WatchCoin from '@/components/partials/WatchCoin.vue'
import AddCoin from '@/components/partials/AddCoin.vue'
import {
  PORTFOLIO_GET_STARTED,
  PORTFOLIO_WELCOME_HEADER,
  PORTFOLIO_WELCOME_MSG1,
  PORTFOLIO_WELCOME_MSG2,
} from '@/constants/copy'
import { useCoinStore } from '@/stores/coin'
import { useUtilStore } from '@/stores/util'

const coinStore = useCoinStore()
const utilStore = useUtilStore()
const storedCoins = ref([])
const searchInput = ref('')
const searchedCoins = ref([])
const showWelcome = ref(false)

onMounted(() => {
  const moonCoins = localStorage.getItem('MoonCoins')
  const parsedCoins = JSON.parse(moonCoins).coins
  storedCoins.value = [...parsedCoins]
})

watch([searchInput], () => {
  fn()
})
const fn = () => {
  const inputUp = searchInput.value.toUpperCase()
  if (inputUp.length >= 2) {
    searchedCoins.value = []
    storedCoins.value.forEach((coin) => {
      const coinNameChar = slicedWordUp(coin.name)
      const coinSymbolChar = slicedWordUp(coin.symbol)
      if (coinNameChar === inputUp || coinSymbolChar === inputUp) {
        const doesExist = searchedCoins.value.some(
          (sc) => sc.name === coin.name
        )
        if (!doesExist) searchedCoins.value.push(coin)
      }
    })
  }
  if (inputUp.length === 0) {
    searchedCoins.value = []
  }
}

const slicedWordUp = (name) => {
  return name.slice(0, searchInput.value.length).toUpperCase()
}

const searchCoinClick = async (coin) => {
  utilStore.mutate_addCoinModalsToggle(true)
  await coinStore.getSingleCoin(coin.id)

  searchedCoins.value = []
}

const pct_coins = ref([
  {
    id: 'BTC',
    name: 'Bitcoin',
    price: '23,955.69',
    holdings: '20',
    value: '692,069.49',
    logo_url:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg',
    pct: 40,
    change_24: '+2.69',
    colors: {
      text: '#000',
      gradient: ['#F7931A', '#FFC783'],
    },
  },
  {
    id: 'ETH',
    name: 'Ethereum',
    price: '23,955.69',
    holdings: '20',
    value: '692,069.49',
    logo_url:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/eth.svg',
    pct: 30,
    change_24: '+2.69',
    colors: {
      text: '#fff',
      gradient: ['#761FC3', '#19012F'],
    },
  },
  {
    id: 'USDT',
    name: 'Tether',
    price: '23,955.69',
    holdings: '20',
    value: '692,069.49',
    logo_url:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/usdt.svg',
    pct: 15,
    change_24: '+2.69',
    colors: {
      text: '#fff',
      background: '#53AE94',
    },
  },
  {
    id: 'USDC',
    name: 'USD Coin',
    price: '23,955.69',
    holdings: '20',
    value: '692,069.49',
    logo_url:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/usdc.svg',
    pct: 10,
    change_24: '+2.69',
    colors: {
      text: '#fff',
      background: '#2775CA',
    },
  },
  {
    id: 'BNB',
    name: 'Binance Coin',
    price: '23,955.69',
    holdings: '20',
    value: '692,069.49',
    logo_url:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/bnb.svg',
    pct: 5,
    change_24: '+2.69',
    colors: {
      text: '#000',
      background: '#F3BA2F',
    },
  },
])
</script>

<template>
  <teleport to="#modals-root">
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <AddCoin :modalCoin="u" v-if="utilStore.addCoinModalsToggle" />
    </transition>
  </teleport>
  <Header />
  <div class="portfolio">
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

    <div v-else class="portfolio__main">
      <!-- Sub header -->
      <div class="portfolio__sub-header">
        <!-- Search coins -->
        <div class="portfolio__coin-search">
          <input v-model="searchInput" type="text" placeholder="Search Coins" />
          <!-- Dropdown -->
          <transition
            mode="out-in"
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutLeft"
          >
            <div class="dropdown-list" v-if="searchedCoins.length !== 0">
              <ul>
                <li v-for="coin in searchedCoins" :key="coin.id">
                  <button @click="searchCoinClick(coin)">
                    {{ coin.id }} - {{ coin.name }}
                  </button>
                </li>
              </ul>
            </div>
          </transition>
          <div class="sort-text">Portfolio display style:</div>
          <div class="sort-btns">
            <button class="grid-btn">
              <img src="/svg/icon-grid.svg" alt="grid icon" />
            </button>
            <button class="list-btn">
              <img src="/svg/icon-list.svg" alt="list icon" />
            </button>
          </div>
        </div>

        <!-- Total Value -->
        <div class="portfolio__total-value">
          <div class="value">
            <div class="value-number">
              <span class="s1">$57,599.55</span> <span class="s2">+5.35%</span>
              <small>24hr</small>
            </div>
          </div>
          <div class="value-currency">
            <span class="text">Currency </span>
            <button class="usd active-currency">USD</button
            ><span class="pipe"> | </span> <button class="btc">BTC</button
            ><span class="pipe"> | </span> <button class="eth">ETH</button
            ><span class="pipe"> | </span>
            <button class="sol">SOL</button>
          </div>
        </div>
      </div>
      <!-- Entries -->
      <div class="portfolio__coins-stats">
        <div class="portfolio__all-coins">
          <!-- Coins -->
          <div class="portfolio__coins">
            <CoinBox
              v-for="(coin, i) in coinStore.portfolioCoins"
              :key="i"
              :coin="coin"
            />
          </div>
          <!-- Watch List -->
          <div class="portfolio__watch">
            <h1>Watch</h1>
            <div class="portfolio__watch-coins">
              <WatchCoin v-for="(e, i) in 2" :key="i" />
            </div>
          </div>
        </div>
        <div class="portfolio__stats">
          <!-- percent bar -->
          <div class="portfolio__pct-bar">
            <div
              class="coin-pct"
              v-for="(coin, i) in pct_coins"
              :key="i"
              :style="{ width: coin.pct + '%' }"
            >
              <div class="pct-num">{{ coin.pct }}%</div>
              <div
                class="pct-color"
                :style="{
                  backgroundImage: coin.colors.gradient
                    ? `linear-gradient(to bottom, ${coin.colors.gradient[0]}, ${coin.colors.gradient[1]})`
                    : 'initial',
                  backgroundColor: coin.colors.background
                    ? coin.colors.background
                    : 'initial',
                }"
              >
                <div :style="{ color: coin.colors.text }">{{ coin.id }}</div>
              </div>
            </div>
          </div>
          <div v-if="false" class="portfolio__twitter-share">
            <img src="/twitter-logo.png" alt="" />
            <div class="shadow"></div>
            <button class="twitter-btn">Share Portfolio</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/shadows.scss';
@import '@/sass/portfolio.scss';
</style>
