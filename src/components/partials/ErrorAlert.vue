<script setup>
const props = defineProps(['message'])
</script>

<template>
  <div class="alert">
    <div class="message">{{ props.message }}</div>
  </div>
</template>

<style lang="scss">
.alert {
  width: 100%;
  position: fixed;
  top: 0;
  height: 80px;
  background: #ff6f6f;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  .message {
    color: #ffffff;
    font-size: 24px;
  }
}
</style>
