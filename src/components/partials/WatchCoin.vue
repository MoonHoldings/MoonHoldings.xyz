<script setup></script>

<template>
  <div class="coin-box">
    <div class="surface">
      <div class="symbol">
        <div class="left">
          <img
            src="https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg"
            alt=""
          />
          <span>BTC</span>
        </div>
        <div class="right">Bitcoin</div>
      </div>
      <div class="price">$23,955.69</div>
      <div class="change">+2.69% 24 hr</div>
    </div>
    <div class="shadow-common btc-shadow">
      <div class="top-corner"></div>
      <div class="bottom-corner"></div>
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
    color: #000000;
    background-color: #ffffff;
    padding: 15px;
    width: 240px;
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 6;

    .symbol {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: center;

        img {
          width: 30px;
          height: 30px;
          margin-right: 7px;
        }
        span {
          font-weight: 700;
          font-size: 18px;
          font-family: 'Inter', monospace;
        }
      }
      .right {
        font-size: 18px;

        font-family: 'Inter', monospace;
      }
    }
    .price {
      font-size: 16px;
      font-weight: 600;
      text-align: center;
    }
    .change {
      font-size: 18px;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
