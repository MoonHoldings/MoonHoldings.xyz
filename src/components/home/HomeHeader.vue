<script setup>
import { RouterLink } from 'vue-router'
import { MOON_XYZ, LOGIN } from '../../constants'
import GreenBtn from '@/components/partials/GreenBtn.vue'
// const props = defineProps(['title'])
</script>

<template>
  <main>
    <header>
      <h1>
        <RouterLink to="/">
          {{ MOON_XYZ }}
        </RouterLink>
      </h1>
      <nav>
        <RouterLink to="/login">{{ LOGIN }}</RouterLink>
        <GreenBtn />
      </nav>
    </header>
  </main>
</template>

<style lang="scss" scoped>
h1 {
  margin: 1em;
  font-size: 1.375rem;
  color: #fff;
}

a {
  color: #fff;
  text-decoration: none;
}

nav {
  position: absolute;
  right: 2em;

  a {
    display: inline-block;
    padding: 0 1rem;
    font-size: 1.375em;
    text-decoration: none;
    color: #fff;
    transition: 0.4s;

    .router-link-exact-active {
      color: #fff;
    }

    .router-link-exact-active:hover {
      background-color: transparent;
    }

    &:hover {
      text-decoration: underline;
    }

    &:first-of-type {
      border: 0;
    }
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
