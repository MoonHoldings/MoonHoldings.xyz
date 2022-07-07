<script setup>
// import { GET_STARTED } from '../../constants'
const props = defineProps(['copy', 'url'])
const { copy, url } = props
console.log('props', props)

const handleGetStartedClick = (msg) => {
  console.log(msg)
  console.log(`Goto: ${url}`)
}
</script>

<template>
  <button v-on:click="handleGetStartedClick(`${copy} clicked.`)">
    {{ copy }}
  </button>
</template>

<style lang="scss" scoped>
button {
  margin-left: 1em;
  padding: 0.5em 1.5em;
  height: 40px;
  width: 160px;
  font-size: 1.1em;
  text-align: center;
  border-radius: 0.35em;
  border: 1px solid #333;
  background: var(--green);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background: #fff;
    box-shadow: 0px 1px 20px 0px var(--green);
  }

  &:active {
    background: var(--pink);
    box-shadow: 0px 1px 40px 0px var(--green);
  }
}
</style>
