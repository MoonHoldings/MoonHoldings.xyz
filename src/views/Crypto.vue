<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import Header from '@/components/partials/Header.vue'
import CoinBox from '@/components/partials/CoinBox.vue'
import WatchCoin from '@/components/partials/WatchCoin.vue'
import AddCoin from '@/components/partials/AddCoin.vue'
import {
  PORTFOLIO_GET_STARTED,
  PORTFOLIO_WELCOME_HEADER,
  TAG_LINE,
  SEARCH_TO_START,
} from '@/constants/copy'
import { useCoinStore } from '@/stores/coin'
import { useUtilStore } from '@/stores/util'
import coinStyles from '@/constants/coinStyles'
import decorateNumber from '@/utils/decorateNumber'
import { useCookies } from 'vue3-cookies'
// import monsterFriend from '/gif/monster-friend.gif'

const { cookies } = useCookies()
const coinStore = useCoinStore()
const utilStore = useUtilStore()
const storedCoins = ref([])
const searchInput = ref('')
const searchedCoins = ref([])
const showWelcome = ref(false)
const windowWidth = ref(0)

const cryptoCoins = computed(() => {
  const coins = coinStore.get_cryptoCoins
  coins.sort((a, b) => b.totalValue - a.totalValue)
  return coins
})

const barChart = computed(() => {
  const pct_array = []

  cryptoCoins.value.forEach((coin) => {
    const pct = (coin.totalValue / coinStore.get_totalPortfolioValue) * 100

    const roundPct = Math.round(pct)
    const coinStyle = coinStyles.find((cs) => cs.id === coin.id)

    if (!coinStyle) {
      pct_array.push({
        id: coin.id,
        pct: roundPct,
        coinStyle: {
          text: '#000',
          background: '#fff',
        },
      })
    } else {
      let coinBg
      if (Array.isArray(coinStyle.colors.background)) {
        if (coinStyle.colors.background.length === 2) {
          coinBg = `linear-gradient(180deg, ${coinStyle.colors.background[0]} 0%, ${coinStyle.colors.background[1]} 100%)`
        } else {
          coinBg = `linear-gradient(180deg, ${coinStyle.colors.background[0]} 0%, ${coinStyle.colors.background[1]} 60%, ${coinStyle.colors.background[2]} 100%)`
        }
      } else {
        coinBg = coinStyle.colors.background
      }

      pct_array.push({
        id: coin.id,
        pct: roundPct,
        coinStyle: {
          text: coinStyle.colors.text,
          background: coinBg,
        },
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

const updateBoxesKey = computed(() => utilStore.updateBoxesKey)

const disappearPct = (pct) => {
  if (windowWidth.value < 1225 && pct < 7) {
    return true
  } else if (windowWidth.value > 1225 && pct < 7) {
    return true
  } else {
    return false
  }
}

onMounted(async () => {
  const moonCoins = localStorage.getItem('MoonCoins')
  const parsedCoins = JSON.parse(moonCoins).coins
  storedCoins.value = [...parsedCoins]

  coinStore.mutate_emptyCryptoCoins()

  const user = cookies.get('user')
  user?.portfolio.coins.forEach((coin) => {
    coinStore.mutate_cryptoCoin(coin)
  })

  window.addEventListener('resize', () => {
    const width = window.innerWidth
    windowWidth.value = width
  })

  await refreshCryptoCoins()
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
  const coins = coinStore.get_cryptoCoins
  const coinExist = coins.find(item => {
    if (item.id === coin.id) {
      return item
    }
  }) ?? {}

  if (coinExist) {
    utilStore.mutate_addCoinModalsToggle(true)
    coinStore.mutate_modalCoin(coinExist)
  } else {
    utilStore.mutate_addCoinModalsToggle(true)
    await coinStore.getSingleCoin(coin.id)
  }

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
  <!-- <div class="monster-friend">
    <img :src="monsterFriend" alt="monster friend" />
  </div> -->
  <div class="crypto">
    <!-- Sub header -->
    <div class="crypto__sub-header">
      <!-- Search coins -->
      <div class="crypto__coin-search">
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
        <!-- <div class="sort-text">Portfolio display style:</div>
        <div class="sort-btns">
          <button class="grid-btn">
            <svg
              fill="#b74bd4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="50px"
              height="50px"
            >
              <path d="M3 7H4V8H3zM3.5 3A.5.5 0 1 0 3.5 4 .5.5 0 1 0 3.5 3z" />
              <path
                fill="none"
                stroke="#b74bd4"
                stroke-miterlimit="10"
                d="M5.5 13.5h-3c-.552 0-1-.448-1-1v-10c0-.552.448-1 1-1h3V13.5zM1.375 9.5L5.5 9.5M1.375 5.5L5.5 5.5"
              />
              <path
                d="M7 3H8V4H7zM3.5 11A.5.5 0 1 0 3.5 12 .5.5 0 1 0 3.5 11zM11.5 11A.5.5 0 1 0 11.5 12 .5.5 0 1 0 11.5 11z"
              />
              <path
                fill="none"
                stroke="#b74bd4"
                stroke-miterlimit="10"
                d="M5.5 1.5H9.5V13.5H5.5zM5.375 9.5L9.5 9.5M5.375 5.5L9.5 5.5"
              />
              <path
                d="M7 11H8V12H7zM11 7H12V8H11zM11.5 3A.5.5 0 1 0 11.5 4 .5.5 0 1 0 11.5 3zM7.5 7A.5.5 0 1 0 7.5 8 .5.5 0 1 0 7.5 7z"
              />
              <path
                fill="none"
                stroke="#b74bd4"
                stroke-miterlimit="10"
                d="M12.5 13.5h-3v-12h3c.552 0 1 .448 1 1v10C13.5 13.052 13.052 13.5 12.5 13.5zM9.375 9.5L13.5 9.5M9.375 5.5L13.5 5.5"
              />
            </svg>
          </button>
          <button class="list-btn" v-if="false">
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="50px"
              height="50px"
            >
              <path
                fill="#000000"
                stroke="#b74bd4"
                stroke-miterlimit="10"
                d="M7 3.5L14 3.5M7 7.5L14 7.5M7 11.5L14 11.5"
              />
              <path
                fill="none"
                stroke="#b74bd4"
                stroke-linejoin="round"
                stroke-miterlimit="10"
                d="M2.5 10.5H4.5V12.5H2.5zM2.5 6.5H4.5V8.5H2.5zM2.5 2.5H4.5V4.5H2.5z"
              />
            </svg>
          </button>
        </div> -->
      </div>

      <!-- Total Value -->
      <div class="crypto__total-value">
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
    <div v-if="cryptoCoins.length === 0" class="crypto__welcome-msg">
      <h1>{{ PORTFOLIO_WELCOME_HEADER }}</h1>
      <p>
        {{ TAG_LINE }} <br />
        {{ SEARCH_TO_START }}
      </p>
      <div class="monster-div">
        <img src="/gif/monster-friend.gif" alt="monster friend" />
      </div>
    </div>

    <div v-else class="crypto__main">
      <div class="crypto__stats">
        <!-- percent bar -->
        <div
          class="crypto__pct-bar"
          :style="{ width: barWidth + '%' + ' !important' }"
        >
          <div
            class="coin-pct"
            v-for="(coin, i) in barChart"
            :key="i"
            :style="{ width: coin.pct + '%' }"
          >
            <div class="pct-num">
              {{ disappearPct(coin.pct) ? '' : `${coin.pct}%` }}
            </div>
            <div
              class="pct-color"
              :style="{ background: coin.coinStyle.background }"
            >
              <div :style="{ color: coin.coinStyle.text }">
                {{ disappearPct(coin.pct) ? '' : coin.id }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="false" class="crypto__twitter-share">
          <img src="/twitter-logo.png" alt="" />
          <div class="shadow"></div>
          <button class="twitter-btn">Share Portfolio</button>
        </div>
      </div>

      <!-- Entries -->
      <div class="crypto__coins-stats">
        <div class="crypto__all-coins">
          <!-- Coins -->
          <div :key="updateBoxesKey" class="crypto__coins">
            <CoinBox v-for="(coin, i) in cryptoCoins" :key="i" :coin="coin" />
          </div>
          <!-- Watch List -->
          <div class="crypto__watch" v-if="false">
            <h1>Watch</h1>
            <div class="crypto__watch-coins">
              <WatchCoin v-for="(e, i) in 2" :key="i" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/shadows.scss';
@import '@/sass/crypto.scss';
</style>
