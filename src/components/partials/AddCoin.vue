<script setup>
import cross from '/svg/icon-cross.svg'
import deleteRow from '/svg/icon-delete-row.svg'
import crossBlack from '/svg/icon-cross-black.svg'
import edit from '/svg/icon-edit.svg'
import loader from '/gif/ufo.gif'
import { useUtilStore } from '@/stores/util'
import { computed, onMounted, ref, watch } from 'vue'
import { useCoinStore } from '@/stores/coin'
import decimalCount from '@/utils/decimalCount'
import prettyNumber from '@/utils/prettyNumber'
import digitCount from '@/utils/digitCount'

const utilStore = useUtilStore()
const coinStore = useCoinStore()
const isCoinLoaded = ref(false)
const walletInput = ref('')
const holdingsInput = ref(null)

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

const saveNcomplete = () => {
  coinStore.addPortfolioCoin(totalHoldings.value, totalValue.value)
  utilStore.mutate_addCoinModalsToggle(false)
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

const totalHoldings = computed(() => {
  if (isCoinLoaded.value === true) {
    let holdingSum = 0
    coinStore.get_modalCoin.wallets.forEach((wallet) => {
      holdingSum += Number(wallet.holding)
    })
    return prettyNumber(String(holdingSum))
  } else {
    return 0
  }
})
const totalValue = computed(() => {
  if (isCoinLoaded.value === true) {
    let valueSum = 0
    coinStore.get_modalCoin.wallets.forEach((wallet) => {
      valueSum += Number(wallet.value)
    })

    return organizeNumber(valueSum)
  } else {
    return 0
  }
})

const organizeNumber = (theNum) => {
  const fractionDigitNum = decimalCount(theNum)
  if (fractionDigitNum > 6) {
    const cutNum = theNum.toFixed(6)
    const prettyValue = prettyNumber(cutNum)
    return prettyValue
  } else {
    const prettyValue = prettyNumber(theNum)
    return prettyValue
  }
}

watch(
  () => coinStore.get_modalCoin,
  () => {
    if (coinStore.get_modalCoin !== {}) {
      isCoinLoaded.value = true
    }
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
              <div class="value">${{ organizeNumber(wallet.value) }}</div>
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
          <div>
            <strong>{{ totalHoldings }}</strong>
          </div>
          <div
            :class="{
              'font-15': digitCount(totalValue) > 15,
              'font-14': digitCount(totalValue) > 18,
            }"
          >
            <strong>${{ totalValue }}</strong>
          </div>
        </div>
      </div>
      <div class="add-coin__buttons">
        <button class="exchange" @click="addWallet">
          Add Exchange / Wallet
        </button>

        <button
          class="save"
          :disabled="!areAllSaved"
          :class="{ 'green-btn': areAllSaved }"
          @click="saveNcomplete"
        >
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
@import '@/sass/addCoin.scss';
</style>
