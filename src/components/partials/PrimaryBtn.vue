<script setup>
const props = defineProps(['copy', 'url'])
const { copy, url } = props

const handleClick = () => {
  console.log(`Goto url: ${url}`)
}
</script>

<template>
  <button v-on:click="handleClick()" type="button">
    {{ copy }}
  </button>
</template>

<style lang="scss" scoped>
button {
  padding: 0.5em 1.2em;
  height: auto;
  width: auto;
  font-size: 2em;
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
    color: #fff;
    background: var(--pink);
    box-shadow: 0px 1px 40px 0px var(--green);
  }
}
</style>
