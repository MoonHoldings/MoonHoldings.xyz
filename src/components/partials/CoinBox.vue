<script setup>
import { ref, reactive, computed } from 'vue'
import coinStyles from '@/constants/coinStyles.js'
import decorateNumber from '@/utils/decorateNumber'
import { useUtilStore } from '@/stores/util'
import { useCoinStore } from '@/stores/coin'
import dustLogo from '/coins/dust.png'

const props = defineProps(['coin'])
const { coin } = props
const utilStore = useUtilStore()
const coinStore = useCoinStore()

const shadowColor = computed(() => {
  let finalShadowColors

  const colorObj = coinStyles.find((obj) => obj.id === coin.id)

  if (colorObj) {
    if (Array.isArray(colorObj.colors.background)) {
      if (colorObj.colors.background.length === 2) {
        finalShadowColors = `linear-gradient(180deg, ${colorObj.colors.background[0]} 0%, ${colorObj.colors.background[1]} 100%)`
      } else {
        finalShadowColors = `linear-gradient(180deg, ${colorObj.colors.background[0]} 0%, ${colorObj.colors.background[1]} 60%, ${colorObj.colors.background[2]} 100%)`
      }
    } else {
      finalShadowColors = colorObj.colors.background
    }
  } else {
    finalShadowColors = '#fff'
  }
  return finalShadowColors
})

const top_corner_color = computed(() => {
  let finalCornerColors
  const colorObj = coinStyles.find((obj) => obj.id === coin.id)

  if (colorObj) {
    if (Array.isArray(colorObj.colors.background)) {
      finalCornerColors = colorObj.colors.background[0]
    } else {
      finalCornerColors = colorObj.colors.background
    }
  } else {
    finalCornerColors = '#fff'
  }
  return finalCornerColors
})

const bottom_corner_color = computed(() => {
  let finalCornerColors

  const colorObj = coinStyles.find((obj) => obj.id === coin.id)

  if (colorObj) {
    if (Array.isArray(colorObj.colors.background)) {
      finalCornerColors =
        colorObj.colors.background[colorObj.colors.background.length - 1]
    } else {
      finalCornerColors = colorObj.colors.background
    }
  } else {
    finalCornerColors = '#fff'
  }
  return finalCornerColors
})

const clickCoinBox = () => {
  utilStore.mutate_addCoinModalsToggle(true)
  coinStore.mutate_modalCoin(coin)
}

const holdingNumCount = (num) => {
  const decoratedNum = decorateNumber(num)
  const numStr = String(decoratedNum)

  return numStr.length
}
</script>

<template>
  <div class="coin-box">
    <div class="surface" @click="clickCoinBox">
      <div class="symbol">
        <div class="left">
          <img
            :src="coin?.symbol === 'DUST' ? dustLogo : coin.logo_url"
            alt=""
          />
          <span>{{ coin?.symbol }}</span>
        </div>
        <div class="right">{{ coin?.name }}</div>
      </div>
      <div
        class="holdings"
        :class="{
          'font-50': holdingNumCount(coin?.totalHoldings) === 8,
          'font-45': holdingNumCount(coin?.totalHoldings) === 9,
          'font-40': holdingNumCount(coin?.totalHoldings) === 10,
          'font-35': holdingNumCount(coin?.totalHoldings) === 11,
          'font-30':
            holdingNumCount(coin?.totalHoldings) === 12 ||
            holdingNumCount(coin?.totalHoldings) === 13, // 12 & 13
          'font-25':
            holdingNumCount(coin?.totalHoldings) === 14 ||
            holdingNumCount(coin?.totalHoldings) === 15 ||
            holdingNumCount(coin?.totalHoldings) === 16,
          'font-15': holdingNumCount(coin?.totalHoldings) > 16,
        }"
      >
        {{ decorateNumber(coin?.totalHoldings) }}
      </div>
      {{ holdingNumCount(coin?.totalHoldings) }}
      <div class="value">
        <div class="label">
          <div>Price</div>
          <div class="price-label">
            ${{ decorateNumber(coin?.price, true) }}
          </div>
        </div>
        <div class="label">
          <div>Total</div>
          <div class="total-label">
            ${{ decorateNumber(coin?.totalValue, true) }}
          </div>
        </div>
      </div>
    </div>
    <div class="shadow-common btc-shadow" :style="{ background: shadowColor }">
      <div class="top-corner" :style="{ background: top_corner_color }"></div>
      <div
        class="bottom-corner"
        :style="{ background: bottom_corner_color }"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/shadows.scss';
@import '@/sass/coin-box.scss';
</style>
