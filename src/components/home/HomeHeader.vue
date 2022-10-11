<script setup>
import { RouterLink } from 'vue-router'
import {
  MOONHOLDINGS,
  LOGIN,
  LOGIN_PATH,
  SIGN_UP,
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
        <PrimaryBtn :copy="SIGN_UP" :url="SIGN_UP_PATH" />
      </nav>
    </header>
  </main>
</template>

<style lang="scss" scoped>
h1 {
  margin: 1.6rem;
  font-size: 2.2rem;
  color: #fff;
}

a {
  color: #fff;
  text-decoration: none;
}

nav {
  position: absolute;
  right: 2rem;

  a {
    display: inline-block;
    padding: 0 1.6rem;
    font-size: 2rem;
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

@media (max-width: 1400px) {
  nav {
    position: relative;
    margin-left: 64rem;
  }
}

@media (max-width: 1100px) {
  header {
    display: flex;
    grid-template-columns: 1fr 1fr;
    min-width: 640px;
  }

  nav {
    position: fixed;
    margin: 0rem 0 0 4rem;
  }
}

@media (max-width: 1024px) {
  nav {
    margin: 1rem 0 0 4rem;
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}

@media (max-width: 640px) {
  nav {
    position: relative !important;
    margin-top: 1.5rem;

    a {
      font-weight: 800;
    }
  }

  button {
    font-size: 1.5rem;
  }
}
</style>
