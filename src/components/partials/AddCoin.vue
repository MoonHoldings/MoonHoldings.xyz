<script setup>
import cross from '/svg/icon-cross.svg'
import deleteRow from '/svg/icon-delete-row.svg'
import crossBlack from '/svg/icon-cross-black.svg'
import edit from '/svg/icon-edit.svg'
import loader from '/gif/ufo.gif'
import { useUtilStore } from '@/stores/util'
import { computed, onMounted, ref, watch } from 'vue'
import { useCoinStore } from '@/stores/coin'

const utilStore = useUtilStore()
const coinStore = useCoinStore()
const isCoinLoaded = ref(false)
const walletInput = ref('')
const holdingsInput = ref(null)
// const areAllSaved = ref(false)

const closeModal = () => {
  utilStore.mutate_addCoinModalsToggle(false)
  coinStore.mutate_emptyModalCoin()
}

const removeWalletInputs = () => {
  coinStore.removeNewWallet()
  walletInput.value = ''
  holdingsInput.value = null
}

const saveNewWalletHoldings = () => {
  coinStore.addHoldings(walletInput.value, holdingsInput.value)
  walletInput.value = ''
  holdingsInput.value = null
}

const addWallet = () => {
  coinStore.addNewWallet()
}

const areAllSaved = computed(() => {
  if (
    isCoinLoaded.value === true &&
    coinStore.get_walletsLength !== 0 &&
    !coinStore.get_unsavedWalletExist
  ) {
    return true
  } else {
    return false
  }
})

watch(
  () => coinStore.get_modalCoin,
  () => {
    if (coinStore.get_modalCoin !== {}) {
      isCoinLoaded.value = true
    }

    // const unsavedWallet = coinStore.get_modalCoin.wallets.find(
    //   (wallet) => wallet.saved === false
    // )
    // if (!unsavedWallet) areAllSaved.value === true
  }
)
</script>

<template>
  <div class="add-coin">
    <transition
      mode="out-in"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="add-coin__loading" v-if="!isCoinLoaded">
        <img :src="loader" alt="loader" />
      </div>
    </transition>
    <div class="add-coin__window">
      <div class="add-coin__title">
        <h1>
          {{ coinStore.get_modalCoin.id }} -
          {{ coinStore.get_modalCoin.name }}
        </h1>
        <div class="price">
          Price: <strong>${{ coinStore.get_modalCoin.price }}</strong>
        </div>
      </div>
      <div class="add-coin__form">
        <div class="header">
          <div>Wallet</div>
          <div>Holdings</div>
          <div>Value</div>
        </div>
        <div class="empty-text" v-if="coinStore.get_walletsLength === 0">
          Select <strong>Add Exchange</strong> or <strong>Add Wallet</strong> to
          start building your <strong>Bitcoin</strong>
          Portfolio
        </div>
        <ul class="holdings-list" v-else>
          <li v-for="(wallet, i) in coinStore.modalCoin.wallets" :key="i">
            <div class="holdings-field" v-if="!wallet.saved">
              <div class="wallet-input">
                <input
                  type="text"
                  placeholder="Enter Exchange / Wallet"
                  v-model="walletInput"
                />
              </div>
              <div class="holdings-input">
                <input type="text" placeholder="0" v-model="holdingsInput" />
              </div>
              <div class="save-btn-input">
                <button @click="saveNewWalletHoldings">Save</button>
                <button @click="removeWalletInputs">
                  <img :src="crossBlack" alt="cross black" />
                </button>
              </div>
            </div>
            <div class="holdings-value" v-else>
              <div class="wallet">{{ wallet.name }}</div>
              <div class="holdings">{{ wallet.holding }}</div>
              <div class="value">${{ wallet.value }}</div>
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
        <button class="exchange" @click="addWallet">
          Add Exchange / Wallet
        </button>

        <button class="save" :class="{ 'green-btn': areAllSaved }">
          Save & Complete
        </button>
      </div>
      <button @click="closeModal" class="cross-btn" v-if="isCoinLoaded">
        <img :src="cross" alt="" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.green-btn {
  background: var(--green) !important;
  color: #000 !important;
}
.add-coin {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 95;

  &__loading {
    position: absolute;
    width: 80rem;
    min-height: 55rem;
    left: 50%;
    right: auto;
    margin-top: 50vh;
    transform: translateX(-50%) translateY(-50%);
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 97;

    img {
      width: 10rem;
    }
  }

  &__window {
    position: relative;
    max-width: 80rem;
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
    z-index: 96;
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
      width: 33.2rem;
      margin: 4.2rem auto;
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
          &:last-child {
            display: grid;
            grid-template-columns: auto 5rem;

            button {
              min-height: 4rem;
              &:first-child {
                background-color: var(--pink);
                color: #fff;
                min-height: 4rem;
                font-size: 1.6rem;
                outline: none;
                border: 1px solid #a1a1a1;
                border-radius: 0.3rem;
              }
              &:last-child {
                border: none;
                outline: none;
                background: none;
                height: 4rem;

                img {
                  height: 100%;
                }
              }
            }
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
      min-width: 21rem;
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
