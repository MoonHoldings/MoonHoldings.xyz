<script setup>
import { reactive } from '@vue/reactivity'

const props = defineProps(['coin'])
const { coin } = props

const shadowColor = coin.colors.gradient
  ? `linear-gradient(180deg, ${coin.colors.gradient[0]} 0%, ${coin.colors.gradient[1]} 100%)`
  : coin.colors.background

const top_corner_color = coin.colors.gradient
  ? coin.colors.gradient[0]
  : coin.colors.background
const bottom_corner_color = coin.colors.gradient
  ? coin.colors.gradient[1]
  : coin.colors.background
</script>

<template>
  <div class="coin-box">
    <div class="surface">
      <div class="symbol">
        <div class="left">
          <img :src="coin.logo_url" alt="" />
          <span>{{ coin.id }}</span>
        </div>
        <div class="right">{{ coin.name }}</div>
      </div>
      <div class="price">
        <div class="text">Price</div>
        <div class="number">${{ coin.price }}</div>
      </div>
      <div class="holdings">
        <div class="text">Holdings</div>
        <div class="number">{{ coin.holdings }}</div>
      </div>
      <div class="value">
        <div class="text">Value</div>
        <div class="number">${{ coin.value }}</div>
      </div>
      <div class="change">{{ coin.change_24 }}% 24 hr</div>
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
      margin-bottom: 32px;
      .left {
        display: flex;
        align-items: center;

        img {
          width: 28px;
          height: 28px;
          margin-right: 7px;
        }
        span {
          color: #000000;
          font-weight: 700;
          font-size: 17px;
          font-family: 'Inter', monospace;
        }
      }
      .right {
        font-size: 17px;
        color: #000000;
        font-family: 'Inter', monospace;
      }
    }
    .price,
    .holdings,
    .value {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .text,
      .number {
        font-size: 16px;
      }
    }
    .price,
    .holdings {
      margin-bottom: 10px;
    }
    .value {
      margin-bottom: 30px;
    }
    .change {
      font-size: 18px;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
