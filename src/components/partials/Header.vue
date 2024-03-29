<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useCoinStore } from '@/stores/coin'
import { useUtilStore } from '@/stores/util'
import decorateNumber from '@/utils/decorateNumber'
import AddCoin from '@/components/partials/AddCoin.vue'
import getMoonToken from '@/utils/getMoonToken'
import {
  CURRENT_SUPPORTED_CHAINS,
  PORTFOLIO_DISPLAY_SYLE,
} from '@/constants/copy'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const coinStore = useCoinStore()
const utilStore = useUtilStore()
const searchInput = ref('')
const searchedCoins = ref([])
const storedCoins = ref([])
const windowWidth = ref(0)
const isMenuOpen = ref(false)

const isNFTSView = computed(() => {
  return (
    route.fullPath.startsWith('/nfts/portfolio') ||
    route.fullPath.startsWith('/nfts/single-collection') ||
    route.fullPath.startsWith('/nfts/lend-borrow')
  )
})

const isCryptoView = computed(() => {
  return route.fullPath == '/crypto'
})

const slicedWordUp = (name) => {
  return name.slice(0, searchInput.value.length).toUpperCase()
}

const searchCoinClick = async (coin) => {
  const coins = coinStore.get_cryptoCoins
  const coinExist =
    coins.find((item) => {
      if (item.id === coin.id) {
        return item
      }
    }) ?? {}

  if (coinExist && Object.keys(coinExist).length > 0) {
    utilStore.mutate_addCoinModalsToggle(true)
    coinStore.mutate_modalCoin(coinExist)
  } else {
    utilStore.mutate_addCoinModalsToggle(true)
    await coinStore.getSingleCoin(coin.id)
  }

  searchedCoins.value = []
  searchInput.value = ''
}

onMounted(async () => {
  const moonCoins = localStorage.getItem('MoonCoins')
  const parsedCoins = JSON.parse(moonCoins).coins
  storedCoins.value = [...parsedCoins]

  const token = getMoonToken()
  if (!token) coinStore.mutate_emptyCryptoCoins()

  window.addEventListener('resize', () => {
    const width = window.innerWidth
    windowWidth.value = width
  })
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

const selectMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const selectMenuSetting = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const selectMenuFaq = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const selectMenuFeedback = () => {
  isMenuOpen.value = !isMenuOpen.value
}
const deleteAccount = async () => {
  try {
    if (confirm('Warning !! You are deleting your account.') == true) {
      const response = await userStore.deleteAccount()

      if (response.success) {
        localStorage.removeItem('MOON_USER')
        localStorage.removeItem('MOON_TOKEN')
        router.push('/')
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}

const selectMenuLogout = () => {
  isMenuOpen.value = !isMenuOpen.value
  localStorage.removeItem('MOON_TOKEN')
  localStorage.removeItem('MOON_USER')

  router.push('/')
}

watch([searchInput], () => {
  fn()
})
</script>

<template>
  <teleport to="#modals-root">
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <AddCoin v-if="utilStore.addCoinModalsToggle" />
    </transition>
  </teleport>

  <div class="header">
    <div class="header__pink-bar" />
    <div class="header__main">
      <div v-if="isNFTSView" class="left-side">
        <div class="label">
          <span>{{ CURRENT_SUPPORTED_CHAINS }}</span>
          <img src="/svg/icon-support-chain.svg" alt="chain-icon" />
        </div>

        <div class="style">
          <span>{{ PORTFOLIO_DISPLAY_SYLE }}</span>
          <img src="/svg/icon-grid.svg" alt="chain-icon" />
          <img src="/svg/icon-list.svg" alt="chain-icon" />
        </div>
      </div>

      <div v-if="isCryptoView" class="crypto__coin-search">
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
      </div>

      <div class="right-side">
        <div class="number">
          ${{ decorateNumber(coinStore?.get_totalPortfolioValue, true) }}
        </div>
        <!-- ? Hiding Percent - will re-display after historical data -->
        <!-- <div class="percent">
          <span class="percent-number">+5.35%</span>
          <span class="percent-date">1D</span>
        </div> -->
        <div class="menu" @click="selectMenu">
          <img src="/svg/icon-hamburger-menu.svg" alt="hamburger menu" />
        </div>
      </div>

      <div v-if="isMenuOpen" class="dropdown-menu">
        <div class="menu-item disabled" @click="selectMenuSetting">
          Settings
        </div>
        <div class="menu-item disabled" @click="selectMenuFaq">FAQ</div>
        <div class="menu-item disabled" @click="selectMenuFeedback">
          Feedback
        </div>
        <div class="menu-item" @click="deleteAccount">Delete Account</div>
        <div class="menu-item" @click="selectMenuLogout">Logout</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/crypto.scss';
@import '@/sass/header.scss';
</style>
