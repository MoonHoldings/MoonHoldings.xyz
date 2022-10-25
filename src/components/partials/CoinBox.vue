<script setup>
import { ref, reactive, computed } from 'vue'
import coinStyles from '@/constants/coinStyles.js'
import decorateNumber from '@/utils/decorateNumber'
import digitCount from '@/utils/digitCount'
import { useUtilStore } from '@/stores/util'
import { useCoinStore } from '@/stores/coin'

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
</script>

<template>
  <div class="coin-box">
    <div class="surface" @click="clickCoinBox">
      <div class="symbol">
        <div class="left">
          <img :src="coin.logo_url" alt="" />
          <span>{{ coin?.id }}</span>
        </div>
        <div class="right">{{ coin?.name }}</div>
      </div>
      <div
        class="holdings"
        :class="{
          'font-45':
            digitCount(coin?.totalHoldings) > 6 &&
            digitCount(coin?.totalHoldings) < 8,
          'font-35':
            digitCount(coin?.totalHoldings) >= 8 &&
            digitCount(coin?.totalHoldings) < 10,
          'font-25':
            digitCount(coin?.totalHoldings) >= 10 &&
            digitCount(coin?.totalHoldings) < 13,
        }"
      >
        {{ decorateNumber(coin?.totalHoldings) }}
      </div>
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
