<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/user'

const props = defineProps(['bg-color', 'text', 'social-name'])
const userStore = useUserStore()

const btn_styles = reactive({
  backgroundColor: `${props.bgColor}`,
  borderColor: `${props.bgColor}`,
})

const btnClick = () => {
  if (props.socialName === 'twitter') {
    window.open(`${userStore.server_url}/auth/twitter`, '_self')
  }
  if (props.socialName === 'discord') {
    window.open(`${userStore.server_url}/auth/discord`, '_self')
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
