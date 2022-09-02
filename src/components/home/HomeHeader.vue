<script setup>
import { RouterLink } from 'vue-router'
import {
  MOONHOLDINGS,
  LOGIN,
  LOGIN_PATH,
  GET_STARTED,
  SIGN_UP_PATH,
} from '../../constants'
import PrimaryBtn from '@/components/partials/PrimaryBtn.vue'
</script>

<template>
  <main>
    <header>
      <h1>
        <RouterLink to="/" title="MoonHoldings.xyz">
          {{ MOONHOLDINGS }}
        </RouterLink>
      </h1>
      <nav>
        <RouterLink :to="LOGIN_PATH">{{ LOGIN }}</RouterLink>
        <PrimaryBtn :copy="GET_STARTED" :url="SIGN_UP_PATH" />
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
    font-size: 2em;
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
