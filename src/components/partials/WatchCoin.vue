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
    <div class="shadow-common doge-shadow"></div>
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
    padding: 9px;
    width: 180px;
    height: 180px;
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
          width: 24px;
          height: 24px;
          margin-right: 7px;
        }
        span {
          color: #000000;
          font-weight: 700;
          font-size: 14px;
          font-family: 'Inter', monospace;
        }
      }
      .right {
        font-size: 14px;
        color: #000000;
        font-family: 'Inter', monospace;
      }
    }
    .price {
      font-size: 13px;
      font-weight: 600;
      text-align: center;
    }
    .change {
      font-size: 14px;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
