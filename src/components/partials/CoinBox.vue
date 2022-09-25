<script setup>
import { ref, reactive } from 'vue'

const props = defineProps(['coin'])
const { coin } = props
const tooltipShow = ref(false)

const shadowColor = coin.colors.gradient
  ? `linear-gradient(180deg, ${coin.colors.gradient[0]} 0%, ${coin.colors.gradient[1]} 100%)`
  : coin.colors.background

const top_corner_color = coin.colors.gradient
  ? coin.colors.gradient[0]
  : coin.colors.background
const bottom_corner_color = coin.colors.gradient
  ? coin.colors.gradient[1]
  : coin.colors.background

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
        <div class="holdings">
          {{ coin.holdings }}
        </div>
        <div class="value">${{ coin.value }}</div>
      </div>

      <!-- <div class="price">
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
      <div class="change">{{ coin.change_24 }}% 24 hr</div> -->
    </div>
    <div class="shadow-common btc-shadow" :style="{ background: shadowColor }">
      <div class="top-corner" :style="{ background: top_corner_color }"></div>
      <div
        class="bottom-corner"
        :style="{ background: bottom_corner_color }"
      ></div>
    </div>
    <div class="tooltip" v-if="tooltipShow">
      <div class="price">Price ${{ coin.price }}</div>
      <div class="change">{{ coin.change_24 }}% 24 hr</div>
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

    // .price,
    // .holdings,
    // .value {
    //   display: flex;
    //   align-items: center;
    //   justify-content: space-between;
    //   .text,
    //   .number {
    //     font-size: 16px;
    //   }
    // }
    // .price,
    // .holdings {
    //   margin-bottom: 10px;
    // }
    // .value {
    //   margin-bottom: 30px;
    // }
    // .change {
    //   font-size: 18px;
    //   font-weight: 600;
    //   text-align: center;
    // }
  }
  .tooltip {
    position: absolute;
    right: -1.5rem;
    bottom: -11rem;
    width: 80%;
    height: 50%;
    background: #000;
    color: #fff;
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 50;

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
