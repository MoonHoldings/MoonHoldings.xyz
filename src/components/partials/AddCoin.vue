<script setup>
import cross from '/svg/icon-cross.svg'
import deleteRow from '/svg/icon-delete-row.svg'
import edit from '/svg/icon-edit.svg'
import { useUtilStore } from '@/stores/util'

const utilStore = useUtilStore()
</script>

<template>
  <div class="add-coin">
    <div class="add-coin__window">
      <div class="add-coin__title">
        <h1>BTC - Bitcoin</h1>
        <div class="price">Price: <strong>$21,500.69</strong></div>
      </div>
      <div class="add-coin__form">
        <div class="header">
          <div>Wallet</div>
          <div>Holdings</div>
          <div>Value</div>
        </div>
        <div class="empty-text" v-if="false">
          Select <strong>Add Exchange</strong> or <strong>Add Wallet</strong> to
          start building your <strong>Bitcoin</strong>
          Portfolio
        </div>
        <ul class="holdings-list">
          <li v-for="(n, i) in 4" :key="i">
            <div class="holdings-field" v-if="false">
              <div class="wallet-input">
                <input v-if="true" type="text" placeholder="Search Exchanges" />
                <input v-else type="text" placeholder="Search Wallets" />
              </div>
              <div class="holdings-input">
                <input type="text" placeholder="0" />
              </div>
              <div class="save-btn-input">
                <button>Save</button>
              </div>
            </div>
            <div class="holdings-value" v-else>
              <div class="wallet">Coinbase</div>
              <div class="holdings">21</div>
              <div class="value">$429,610.02</div>
              <div class="3-dots">
                <button>
                  <img src="/svg/icon-three-dots-vertical.svg" alt="" />
                </button>
              </div>
              <div class="menu-options" v-if="false">
                <button class="edit-btn">
                  <img :src="edit" alt="edit icon" />
                </button>
                <button class="delete-btn">
                  <img :src="deleteRow" alt="delete row icon" />
                </button>
              </div>
            </div>
          </li>
        </ul>
        <div class="totality">
          <div>Total</div>
          <div><strong>0</strong></div>
          <div><strong>$0</strong></div>
        </div>
      </div>
      <div class="add-coin__buttons">
        <button class="exchange">Add Exchange</button>
        <button class="wallet">Add Wallet</button>
        <button class="save">Save & Complete</button>
      </div>
      <button
        @click="utilStore.mutate_addCoinModalsToggle(false)"
        class="cross-btn"
      >
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
    max-width: 67rem;
    min-height: 55rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50vh;
    transform: translateY(-50%);
    padding: 2rem;
    font-family: 'Inter', monospace;
    display: grid;
    grid-template-rows: 3rem auto 7rem;
    background: #fff;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 1.8rem;
      font-weight: 800;
    }
    .price {
      font-size: 1.8rem;
      font-family: 'Inconsolata', monospace;
    }
  }

  &__form {
    padding-top: 2rem;
    .header,
    .totality {
      display: grid;
      grid-template-columns: 45% 25.5% 29.5%;
      padding: 0.6rem 3rem 0.6rem 0;

      & > div {
        font-size: 1.8rem;
        color: #000;
        &:not(:first-child) {
          text-align: right;
        }
      }
    }

    .empty-text {
      margin: 4.2rem 12rem;
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
        padding: 0 0.5rem;
        &:first-child {
          font-weight: 800;
        }
      }
    }
    .holdings-list {
      list-style: none;
      width: inherit;
      max-height: 30rem;
      overflow-y: auto;

      /* width */
      &::-webkit-scrollbar {
        width: 0.8rem;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: #eee;
        border-radius: 1rem;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: var(--pink);
        border-radius: 1rem;
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: rgb(201, 28, 220);
      }

      li {
        padding: 1.5rem 0;
        &:not(:first-child) {
          border-top: 1px solid rgba(0, 0, 0, 0.15);
        }
      }

      .holdings-field {
        display: flex;
        margin-right: 0.3rem;
        gap: 1rem;

        div {
          flex: 1;

          input {
            width: 100%;
            min-height: 4rem;
            font-size: 1.6rem;
            padding: 0 1rem;
            border: 1px solid var(--pink);
            border-radius: 0.3rem;
            outline: none;
            background: #eeeeee;
          }

          button {
            width: 100%;
            background-color: var(--pink);
            color: #fff;
            min-height: 4rem;
            font-size: 1.6rem;
            outline: none;
            border: 1px solid #a1a1a1;
            border-radius: 0.3rem;
          }
        }
      }
      .holdings-value {
        position: relative;
        display: flex;
        align-items: center;

        & > div {
          font-size: 1.55rem;
          &:not(:first-child) {
            text-align: right;
          }
          &:nth-child(1) {
            flex: 45;
            padding-right: 0.5rem;
          }
          &:nth-child(2) {
            flex: 25;
          }
          &:nth-child(3) {
            flex: 30;
            padding-left: 0.5rem;
          }
          button {
            display: flex;
            align-items: center;
            padding: 0;
            margin: 0;
            border: none;
            outline: none;
            background: none;
            cursor: default;
            img {
              height: 2.5rem;
            }
          }
        }
        .menu-options {
          // border: 1px solid magenta;
          position: absolute;
          display: flex;
          right: 0;
          background: #fff;
          padding: 0.8rem;
          margin-right: 2.5rem;
          border-radius: 0.5rem;
          box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
            rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

          .edit-btn {
            position: relative;
            bottom: 0.15rem;
            margin-right: 0.5rem;
          }
        }
      }
    }
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      min-width: 19.4rem;
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
