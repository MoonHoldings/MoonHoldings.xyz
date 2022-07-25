<script setup>
import { reactive } from 'vue'
const props = defineProps(['bg-color', 'text'])

const btn_styles = reactive({
  backgroundColor: `${props.bgColor}`,
  borderColor: `${props.bgColor}`,
})
</script>

<template>
    <button :style="btn_styles">
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
