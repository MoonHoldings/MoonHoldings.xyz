<script setup>
import { ref } from 'vue'
import { useCoinStore } from '@/stores/coin'

const coinStore = useCoinStore()
const inputCoinName = ref('')

const searchCoins = () => {
  // const searchedCoins = []
  if (inputCoinName.value.length >= 2) {
    const fetchedCoins = coinStore.coins
    fetchedCoins.forEach(() => {
      //use regex to get matched coins from fetchedCoins
    })
  }
}
</script>

<template>
  <div class="p-coins">
    <form class="dropdown-form">
      <input
        type="text"
        placeholder="Search coins"
        v-model="activeCoin"
        @change="searchCoins"
      />
      <ul class="coin-list">
        <li>BTC</li>
        <li>ETH</li>
      </ul>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.p-coins {
  padding: 1em;
  display: inline-block;

  .dropdown-form {
    ul {
      list-style: none;
      border: 1px solid black;

      li {
        cursor: pointer;
      }
    }
  }
}
</style>
