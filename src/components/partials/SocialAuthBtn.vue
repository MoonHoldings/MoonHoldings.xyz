<script setup>
import { reactive } from 'vue'
const props = defineProps(['bg-color', 'text', 'social-name'])

const btn_styles = reactive({
  backgroundColor: `${props.bgColor}`,
  borderColor: `${props.bgColor}`,
})

const btnClick = () => {
  if (props.socialName === 'twitter') {
    window.open('http://localhost:9000/api/auth/twitter', '_self')
  }
  if (props.socialName === 'discord') {
    window.open('http://localhost:9000/api/auth/discord', '_self')
  }
}
</script>

<template>
  <button @click.prevent="btnClick" :style="btn_styles">
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
