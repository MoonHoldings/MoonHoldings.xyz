<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sec = ref(6)

onMounted(() => {
  const interval = setInterval(() => {
    sec.value--
    if (sec.value === 0) {
      clearInterval(interval)
      router.push('/login')
    }
  }, 1000)
})
</script>

<template>
  <div class="success-alert">
    <div>
      Account Created! Please <router-link to="/login">login</router-link>.
      <span class="redirect-time"> Redirecting to login in {{ sec }}...</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.success-alert {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  width: 100%;
  height: 80px;
  background-color: #78ffa6db;
  z-index: 100;

  a {
    color: #000;
  }

  .redirect-time {
    font-size: 1rem;
  }
}
</style>
