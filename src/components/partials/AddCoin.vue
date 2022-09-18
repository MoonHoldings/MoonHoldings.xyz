<script setup>
import cross from '/svg/icon-cross.svg'
</script>

<template>
  <div class="add-coin">
    <div class="add-coin__window">
      <h1>BTC - Bitcoin</h1>
      <div class="add-coin__form">
        <div class="header">
          <div>Wallet</div>
          <div>Holdings</div>
          <div>Value</div>
        </div>
        <div class="empty-text">
          Select <strong>Add Exchange</strong> or <strong>Add Wallet</strong> to
          start building your <strong>Bitcoin</strong>
          Portfolio
        </div>
        <div class="totality">
          <div>Total</div>
          <div>0</div>
          <div>$0</div>
        </div>
      </div>
      <div class="add-coin__buttons">
        <button class="exchange">Add Exchange</button>
        <button class="wallet">Add Wallet</button>
        <button class="save">Save & Complete</button>
      </div>
      <button class="cross-btn">
        <img :src="cross" alt="" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-coin {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 95;

  &__window {
    position: relative;
    max-width: 60rem;
    min-height: 50rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50vh;
    transform: translateY(-50%);
    padding: 2rem;
    font-family: 'Inter', monospace;
    display: grid;
    grid-template-rows: 3rem auto 7rem;
    background: #fff;

    h1 {
      font-size: 1.8rem;
      font-weight: 800;
    }
  }

  &__form {
    .header,
    .totality {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 0.6rem;

      > div {
        text-align: right;
        font-size: 1.7rem;
        color: rgba(51, 51, 51, 0.2);
      }
    }

    .empty-text {
      margin: 4.2rem 11rem;
      text-align: center;
      font-size: 1.6rem;
      line-height: 2.8rem;
    }
    .header {
      border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    }
    .totality {
      border-top: 1px solid rgba(0, 0, 0, 0.25);

      > div {
        font-weight: 800;
      }
    }
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      min-width: 16.4rem;
      min-height: 5rem;
      border: 1px solid #a1a1a1;
      border-radius: 0.3rem;
      font-size: 1.6rem;
      color: #fff;
      font-family: 'Inter', monospace;
    }
    .exchange,
    .wallet {
      background: var(--pink);
    }

    .save {
      background: #868686;
    }
  }

  .cross-btn {
    position: absolute;
    right: -7rem;
    top: -1rem;
    background: none;
    border: none;
    outline: none;
  }
}
</style>
