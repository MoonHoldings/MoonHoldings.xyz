<script setup>
import { ref, reactive, computed } from 'vue'
import coinStyles from '@/constants/coinStyles.js'
import decorateNumber from '@/utils/decorateNumber'
import digitCount from '@/utils/digitCount'
import { useUtilStore } from '@/stores/util'
import { useCoinStore } from '@/stores/coin'

const props = defineProps(['coin'])
const { coin } = props
const tooltipShow = ref(false)
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

const surfaceMouseover = () => {
  tooltipShow.value = true
}
const surfaceMouseout = () => {
  tooltipShow.value = false
}
const clickCoinBox = () => {
  utilStore.mutate_addCoinModalsToggle(true)
  coinStore.mutate_modalCoin(coin)
}
</script>

<template>
  <div class="coin-box">
    <div
      class="surface"
      @mouseover="surfaceMouseover"
      @mouseout="surfaceMouseout"
      @click="clickCoinBox"
    >
      <div class="symbol">
        <div class="left">
          <img :src="coin.logo_url" alt="" />
          <span>{{ coin.id }}</span>
        </div>
        <div class="right">{{ coin.name }}</div>
      </div>
      <div
        class="holdings"
        :class="{
          'font-45':
            digitCount(coin.totalHoldings) > 6 &&
            digitCount(coin.totalHoldings) < 8,
          'font-35':
            digitCount(coin.totalHoldings) >= 8 &&
            digitCount(coin.totalHoldings) < 10,
          'font-25':
            digitCount(coin.totalHoldings) >= 10 &&
            digitCount(coin.totalHoldings) < 13,
        }"
      >
        {{ decorateNumber(coin.totalHoldings) }}
      </div>
      <div class="value">${{ decorateNumber(coin.totalValue, true) }}</div>
    </div>
    <div class="shadow-common btc-shadow" :style="{ background: shadowColor }">
      <div class="top-corner" :style="{ background: top_corner_color }"></div>
      <div
        class="bottom-corner"
        :style="{ background: bottom_corner_color }"
      ></div>
    </div>
    <div class="tooltip" v-if="tooltipShow">
      <div class="name">{{ coin.name }}</div>
      <div class="price">Price ${{ decorateNumber(coin.price, true) }}</div>
      <div class="change">{{ coin._24hr }}% 24 hr</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/sass/shadows.scss';

.coin-box {
  position: relative;
  .surface {
    position: relative;
    border: 1px solid #000;
    border-radius: 2px;
    background-color: #ffffff;
    color: #000;
    padding: 15px;
    width: 240px;
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 6;
    cursor: pointer;

    & > div {
      color: #000;
    }

    .symbol {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        margin-right: 1rem;

        img {
          width: 2.8rem;
          height: 2.8rem;
          margin-right: 0.7rem;
        }
        span {
          color: #000000;
          font-weight: 700;
          font-size: 1.7rem;
          font-family: 'Inter', monospace;
        }
      }
      .right {
        font-size: 1.7rem;
        color: #000000;
        font-family: 'Inter', monospace;
        margin-left: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .holdings {
      font-size: 6rem;
      line-height: 1;
      text-align: center;
    }
    .value {
      font-size: 2.2rem;
      text-align: center;
      margin-bottom: 1rem;
    }
  }
  .tooltip {
    position: absolute;
    right: -1.5rem;
    bottom: -17rem;
    width: 85%;
    height: 70%;
    background: #000;
    color: #fff;
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 50;
    .name {
      text-align: center;
      margin-bottom: 1rem;
    }

    &::after {
      content: '';
      position: absolute;
      top: -2.5rem;
      left: 0.6rem;
      width: 0;
      height: 0;
      border-left: 1.5rem solid #000;
      border-top: 1.5rem solid #000;
      border-bottom: 1.5rem solid transparent;
      border-right: 1.5rem solid transparent;
      transform: rotate(45deg);
    }
    &::before {
      content: '';
      position: absolute;
      top: -1rem;
      left: 0;
      width: 4.2rem;
      height: 4.2rem;
      background-color: #000;
    }
  }
}
</style>
