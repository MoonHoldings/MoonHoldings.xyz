<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps(['copy', 'url'])

const handleClick = () => {
  router.push(props.url)
  console.log(`Goto url: ${props.url}`)
}
</script>

<template>
  <button @click="handleClick()" type="button">
    {{ props.copy }}
  </button>
</template>

<style lang="scss" scoped>
@import '@/sass/mixins/primary-btn.scss';

button {
  @include primary-btn;
}
</style>
