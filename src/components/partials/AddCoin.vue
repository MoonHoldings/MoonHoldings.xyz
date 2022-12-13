<script setup>
import cross from '/svg/icon-cross.svg'
import deleteRow from '/svg/icon-delete-row.svg'
import crossBlack from '/svg/icon-cross-black.svg'
import edit from '/svg/icon-edit.svg'
import loader from '/gif/bar-loader.gif'
import { useUtilStore } from '@/stores/util'
import { computed, onMounted, ref, watch } from 'vue'
import { useCoinStore } from '@/stores/coin'
import digitCount from '@/utils/digitCount'
import decorateNumber from '@/utils/decorateNumber'
import { ALL_INPUTS_NEED_FILLED, INVALID_INPUT } from '@/constants/copy'

const utilStore = useUtilStore()
const coinStore = useCoinStore()
const isCoinLoaded = ref(false)
const walletInput = ref('')
const holdingsInput = ref(null)
const walletInputError = ref(false)
const holdingsInputError = ref(false)
const _3dotsOpen = ref(false)

const closeModal = () => {
  cancelSaveNewWalletHoldings()

  utilStore.mutate_addCoinModalsToggle(false)
  coinStore.mutate_emptyModalCoin()
}

const cancelSaveNewWalletHoldings = () => {
  coinStore.cancelNewWallet()
  walletInput.value = ''
  holdingsInput.value = null

  walletInputError.value = false
  holdingsInputError.value = false
  utilStore.mutate_errorToggle(false)
  utilStore.mutate_errorMessage('')
}

const isRightNum = (inputNum) => {
  const isWrongNumber = /[^0-9\.,]/g.test(inputNum)

  if (isWrongNumber) {
    return false
  } else {
    const dotArr = inputNum.match(/\./g)
    if (dotArr !== null) {
      return dotArr.length === 1 ? true : false
    }
    return true
  }
}
const saveNewWalletHoldings = () => {
  walletInputError.value = false
  holdingsInputError.value = false

  const isCorrectNum = isRightNum(holdingsInput.value)

  if (!walletInput.value && !holdingsInput.value) {
    walletInputError.value = true
    holdingsInputError.value = true
    utilStore.mutate_errorToggle(true)
    utilStore.mutate_errorMessage(ALL_INPUTS_NEED_FILLED)
  } else if (!walletInput.value) {
    walletInputError.value = true
    utilStore.mutate_errorToggle(true)
    utilStore.mutate_errorMessage(ALL_INPUTS_NEED_FILLED)
  } else if (!holdingsInput.value) {
    holdingsInputError.value = true
    utilStore.mutate_errorToggle(true)
    utilStore.mutate_errorMessage(ALL_INPUTS_NEED_FILLED)
  } else if (!isCorrectNum) {
    holdingsInputError.value = true
    utilStore.mutate_errorToggle(true)
    utilStore.mutate_errorMessage(INVALID_INPUT)
  } else {
    utilStore.mutate_errorToggle(false)
    utilStore.mutate_errorMessage('')

    if (holdingsInput.value.includes(','))
      holdingsInput.value = holdingsInput.value
        .split('')
        .filter((el) => el !== ',')
        .join('')

    coinStore.addHoldings(walletInput.value, holdingsInput.value)

    walletInput.value = ''
    holdingsInput.value = null
  }
}

const addWallet = () => {
  coinStore.addNewWallet()
}

const saveNcomplete = async () => {
  let holdingSum = 0
  coinStore.get_modalCoin.wallets.forEach((wallet) => {
    holdingSum += Number(wallet.holding)
  })
  let valueSum = 0
  coinStore.get_modalCoin.wallets.forEach((wallet) => {
    valueSum += Number(wallet.value)
  })
  isCoinLoaded.value = false
  await coinStore.addCryptoCoin(holdingSum, valueSum)
  utilStore.mutate_updateBoxesKey()
  utilStore.mutate_addCoinModalsToggle(false)
}

const editWallet = (walletName) => {
  _3dotsOpen.value = false
  const theWallet = modalCoin.value.wallets.find((w) => w.name === walletName)

  walletInput.value = theWallet.name
  holdingsInput.value = theWallet.holding

  coinStore.unsaveWallet(walletName)
}

const deleteWallet = (walletName) => {
  coinStore.removeWallet(walletName)
  _3dotsOpen.value = false
}

const removeCoin = async () => {
  const wallets = coinStore.get_modalCoin.wallets

  if (wallets.length) {
    isCoinLoaded.value = false
    await coinStore.removeCryptoCoin()
    utilStore.mutate_updateBoxesKey()
    utilStore.mutate_addCoinModalsToggle(false)
  } else {
    closeModal()
  }
}

const modalCoin = computed(() => {
  return coinStore.get_modalCoin
})

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
    modalCoin.value.wallets?.forEach((wallet) => {
      holdingSum += Number(wallet.holding)
    })
    return decorateNumber(holdingSum)
  } else {
    return 0
  }
})
const totalValue = computed(() => {
  if (isCoinLoaded.value === true) {
    let valueSum = 0
    coinStore.get_modalCoin.wallets?.forEach((wallet) => {
      valueSum += Number(wallet.value)
    })
    return decorateNumber(valueSum, true)
  } else {
    return 0
  }
})

onMounted(() => {
  const modalCoin = coinStore.get_modalCoin
  if (modalCoin.id) {
    isCoinLoaded.value = true
  }
})

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
    <div class="add-coin__window" v-if="isCoinLoaded">
      <div class="add-coin__title">
        <h1>
          {{ modalCoin.id }} -
          {{ modalCoin.name }}
        </h1>
        <div class="price">
          Price: <strong>${{ decorateNumber(modalCoin.price, true) }}</strong>
        </div>
      </div>
      <div class="add-coin__form">
        <div class="header">
          <div>Wallet</div>
          <div>Holdings</div>
          <div>Value</div>
          <div />
        </div>
        <div class="empty-text" v-if="coinStore.get_walletsLength === 0">
          Select <strong>Add Wallet</strong> to start building your
          <strong>{{ modalCoin.name }}</strong> position.
        </div>
        <ul class="holdings-list" v-else>
          <li v-for="(wallet, i) in modalCoin.wallets" :key="i">
            <div class="holdings-field" v-if="wallet.saved == false">
              <div class="wallet-input">
                <input
                  type="text"
                  placeholder="Enter Exchange / Wallet"
                  :class="{ 'input-error': walletInputError }"
                  v-model="walletInput"
                  @keyup.enter="saveNewWalletHoldings"
                />
              </div>
              <div class="holdings-input">
                <input
                  type="text"
                  placeholder="0"
                  :class="{ 'input-error': holdingsInputError }"
                  v-model="holdingsInput"
                  @keyup.enter="saveNewWalletHoldings"
                />
              </div>
              <div class="save-btn-input">
                <button @click="saveNewWalletHoldings">Save</button>
                <button @click="cancelSaveNewWalletHoldings">
                  <img :src="crossBlack" alt="cross black" />
                </button>
              </div>
            </div>
            <div class="holdings-value" v-else>
              <div class="wallet">{{ wallet.name }}</div>
              <div class="holdings">{{ decorateNumber(wallet.holding) }}</div>
              <div class="value">${{ decorateNumber(wallet.value, true) }}</div>
              <div class="menu-options" v-if="!_3dotsOpen">
                <button class="edit-btn" @click="editWallet(wallet.name)">
                  <img :src="edit" alt="edit icon" />
                </button>
                <button class="delete-btn" @click="deleteWallet(wallet.name)">
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
          <div />
        </div>
      </div>
      <div class="add-coin__buttons">
        <button class="remove" @click="removeCoin">
          Remove {{ coinStore.get_modalCoin.id }}
        </button>

        <button class="wallet" @click="addWallet">Add Wallet</button>

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
@import '@/sass/add-coin.scss';
</style>
