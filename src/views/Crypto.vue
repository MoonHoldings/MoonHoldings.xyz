<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import Header from '@/components/partials/Header.vue'
import CoinBox from '@/components/partials/CoinBox.vue'
import WatchCoin from '@/components/partials/WatchCoin.vue'
import {
  PORTFOLIO_GET_STARTED,
  PORTFOLIO_WELCOME_HEADER,
  TAG_LINE,
  SEARCH_TO_START,
} from '@/constants/copy'
import { useCoinStore } from '@/stores/coin'
import { useUtilStore } from '@/stores/util'
import { useCookies } from 'vue3-cookies'
import coinStyles from '@/constants/coinStyles'

const { cookies } = useCookies()
const coinStore = useCoinStore()
const utilStore = useUtilStore()
const storedCoins = ref([])
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

  const user = cookies.get('MOON_USER')
  user?.portfolio.coins.forEach((coin) => {
    coinStore.mutate_cryptoCoin(coin)
  })

  window.addEventListener('resize', () => {
    const width = window.innerWidth
    windowWidth.value = width
  })

  await coinStore.refreshCryptoCoins()
})
</script>

<template>
  <Header />

  <div class="crypto">
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
@import '@/sass/crypto.scss';
@import '@/sass/shadows.scss';
</style>
