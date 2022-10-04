<script setup>
import { ref, reactive, computed } from 'vue'
import coinStyles from '@/constants/coinStyles.js'
import decorateNumber from '@/utils/decorateNumber'
import digitCount from '@/utils/digitCount'

const props = defineProps(['coin'])
const { coin } = props
const tooltipShow = ref(false)

const shadowColor = computed(() => {
  let finalShadowColors

  const colorObj = coinStyles.find((obj) => obj.id === coin.id)

  if (colorObj) {
    finalShadowColors = colorObj.colors.gradient
      ? `linear-gradient(180deg, ${colorObj.colors.gradient[0]} 0%, ${colorObj.colors.gradient[1]} 100%)`
      : colorObj.colors.background
  } else {
    finalShadowColors = '#fff'
  }
  return finalShadowColors
})

const top_corner_color = computed(() => {
  let finalCornerColors

  const colorObj = coinStyles.find((obj) => obj.id === coin.id)

  if (colorObj) {
    finalCornerColors = colorObj.colors.gradient
      ? colorObj.colors.gradient[0]
      : colorObj.colors.background
  } else {
    finalCornerColors = '#fff'
  }
  return finalCornerColors
})

const bottom_corner_color = computed(() => {
  let finalCornerColors

  const colorObj = coinStyles.find((obj) => obj.id === coin.id)

  if (colorObj) {
    finalCornerColors = colorObj.colors.gradient
      ? colorObj.colors.gradient[1]
      : colorObj.colors.background
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
</script>

<template>
  <div class="coin-box">
    <div
      class="surface"
      @mouseover="surfaceMouseover"
      @mouseout="surfaceMouseout"
    >
      <div class="symbol">
        <div class="left">
          <img :src="coin.logo_url" alt="" />
          <span>{{ coin.id }}</span>
        </div>
        <div class="right">{{ coin.name }}</div>
      </div>
      <div class="holdings-value">
        <div
          class="holdings"
          :class="{
            'font-50': digitCount(coin.totalHoldings) > 6,
            'font-40': digitCount(coin.totalHoldings) > 8,
          }"
        >
          {{ decorateNumber(coin.totalHoldings) }}
        </div>
        <div class="value">${{ decorateNumber(coin.totalValue, true) }}</div>
      </div>
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
      <div class="price">Price ${{ coin.price }}</div>
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
    z-index: 6;

    .symbol {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3rem;
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

    .holdings-value {
      color: #000;
      .holdings {
        font-size: 6rem;
        text-align: center;
      }
      .value {
        font-size: 2.2rem;
        text-align: center;
      }
    }
  }
  .tooltip {
    position: absolute;
    right: -1.5rem;
    bottom: -16rem;
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
