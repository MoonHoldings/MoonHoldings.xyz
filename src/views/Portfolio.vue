<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
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
import coinStyles from '@/constants/coinStyles'
import decorateNumber from '@/utils/decorateNumber'

const coinStore = useCoinStore()
const utilStore = useUtilStore()
const storedCoins = ref([])
const searchInput = ref('')
const searchedCoins = ref([])
const showWelcome = ref(false)

const barChart = computed(() => {
  const pct_array = []
  const portfolioCoins = coinStore.get_portfolioCoins

  portfolioCoins.forEach((coin) => {
    const pct = (coin.totalValue / coinStore.get_totalPortfolioValue) * 100

    const roundPct = Math.round(pct)
    const coinStyle = coinStyles.find((cs) => cs.id === coin.id)

    if (!coinStyle) {
      pct_array.push({
        id: coin.id,
        pct: roundPct,
        coinStyle: {
          id: coin.id,
          name: coin.name,
          colors: {
            text: '#000',
            background: '#fff',
          },
        },
      })
    } else {
      pct_array.push({
        id: coin.id,
        pct: roundPct,
        coinStyle,
      })
    }
  })

  pct_array.sort((a, b) => b.pct - a.pct)
  return pct_array
})

const barWidth = computed(() => {
  let barWidth = 0
  barChart.value.forEach((coin) => {
    barWidth += coin.pct
  })
  return barWidth
})

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
  searchInput.value = ''
}
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
    <!-- Sub header -->
    <div class="portfolio__sub-header">
      <!-- Search coins -->
      <div class="portfolio__coin-search">
        <input v-model="searchInput" type="text" placeholder="Search Coins" />
        <!-- Dropdown -->
        <transition
          mode="out-in"
          enter-active-class="animate__animated animate__bounceInDown"
          leave-active-class="animate__animated animate__bounceOutUp"
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
            <span class="s1"
              >${{
                decorateNumber(coinStore.get_totalPortfolioValue, true)
              }}</span
            >
            <span class="s2" v-if="false">+5.35%</span>
            <small v-if="false">24hr</small>
          </div>
        </div>
        <div class="value-currency" v-if="false">
          <span class="text">Currency </span>
          <button class="usd active-currency">USD</button
          ><span class="pipe"> | </span> <button class="btc">BTC</button
          ><span class="pipe"> | </span> <button class="eth">ETH</button
          ><span class="pipe"> | </span>
          <button class="sol">SOL</button>
        </div>
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

    <div v-else class="portfolio__main">
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
          <div class="portfolio__watch" v-if="false">
            <h1>Watch</h1>
            <div class="portfolio__watch-coins">
              <WatchCoin v-for="(e, i) in 2" :key="i" />
            </div>
          </div>
        </div>
        <div class="portfolio__stats">
          <!-- percent bar -->
          <div
            class="portfolio__pct-bar"
            :style="{ width: barWidth + '%' + ' !important' }"
          >
            <div
              class="coin-pct"
              v-for="(coin, i) in barChart"
              :key="i"
              :style="{ width: coin.pct + '%' }"
            >
              <div class="pct-num">{{ coin.pct }}%</div>
              <div
                class="pct-color"
                :style="{
                  backgroundImage: coin.coinStyle.colors.gradient
                    ? `linear-gradient(to bottom, ${coin.coinStyle.colors.gradient[0]}, ${coin.coinStyle.colors.gradient[1]})`
                    : 'initial',
                  backgroundColor: coin.coinStyle.colors.background
                    ? coin.coinStyle.colors.background
                    : 'initial',
                }"
              >
                <div :style="{ color: coin.coinStyle.colors.text }">
                  {{ coin.id }}
                </div>
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
