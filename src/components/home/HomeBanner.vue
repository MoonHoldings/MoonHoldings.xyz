<template>
  <main class="moon-banner">
    <img src="/mh-zen-banner.gif" title="Art commissioned from Zen0" />
  </main>
</template>

<style lang="scss" scoped>
.moon-banner {
  z-index: 1;
  position: absolute;
  top: 68px;
  width: 100%;
  height: 400px;
  color: white;
  background: black;
  text-align: center;

  img {
    height: 100%;
  }
}

@media (max-width: 1400px) {
  .moon-banner {
    height: 240px;
  }
}

@media (max-width: 990px) {
  .moon-banner {
    height: 150px;
  }
}

@media screen and (min-width:320px) and (max-width:640px) {
  .moon-banner {
    height: 100px;

    img {
      // max-width: 640px;
      min-width: 320px;
    }
  }
}

</style>
