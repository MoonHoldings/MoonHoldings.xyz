<script setup>
const props = defineProps(['bg-color', 'text'])

const social_auth_styles = () => {
  return [
    {
      backgroundColor: `${this.bgColor}`,
      borderColor: `${this.bgColor}`,
    },
  ]
}
</script>

<template>
  <button
    :style="{
      'background-color': props.bgColor,
      'border-color': props.bgColor,
    }"
  >
    <!-- <button :style="social_auth_styles"> -->
    {{ props.text }}
  </button>
</template>

<style scoped lang="scss">
button {
  width: 100%;
  height: 48px;
  outline: none;
  border-radius: 4px;
  color: #fff;
  font-size: 18px;
  letter-spacing: 0.8px;
}
</style>
