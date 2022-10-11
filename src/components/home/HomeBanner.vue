<template>
  <main class="moon-banner">
    <img src="/mh-zen-banner.gif" title="Art commissioned from Zen0" />
  </main>
</template>

<style lang="scss" scoped>
.moon-banner {
  top: -16rem;
  height: 28rem;
  color: white;
  background: black;
  text-align: center;

  img {
    height: 100%;
  }
}

@media (max-width: 1400px) {
  .moon-banner {
    top: -17rem;
    height: 24rem;
  }
}

@media (max-width: 1100px) {
  .moon-banner {
    height: 20rem;
  }
}

@media (max-width: 990px) {
  .moon-banner {
    height: 16rem;
  }
}

@media (max-width: 640px) {
  .moon-banner {
    margin-top: 100px;
    width: 390px; 
    height: 8rem;

    img {
      height: 78px;
    }
  }
}
</style>
