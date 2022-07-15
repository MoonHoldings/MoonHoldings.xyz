<script setup>
const props = defineProps(['bg-color', 'text'])
</script>

<template>
  <button :style="{ 'background-color': props.bgColor }">
    {{ props.text }}
  </button>
</template>

<style scoped lang="scss">
button {
  width: 100%;
  height: 48px;
  outline: none;
  border: 1px solid #a1a1a1;
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  letter-spacing: 0.8px;
}
</style>
