<template>
  <div class="homepage">
    <div class="parent">
      <div class="child">
        <img
          src="/svg/moon-holdings-logo.svg"
          width="420"
          alt="MoonHoldings.xyz"
          title="Logo art by Zen0"
        />
        <div class="copy">
          <p>MoonHoldings.xyz</p>
          <p class="small">is being built</p>
          <a href="https://twitter.com/moonholdingsxyz" target="_blank">
            <img src="/twitter-logo.png" alt="MoonHoldings Twitter" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.parent {
  height: 100%;
  width: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
}

.child {
  margin-top: 50%;
  height: 420px;
  width: 420px;
}

.copy {
  margin-top: 2rem;
  text-align: center;

  img {
    margin-top: 2rem;
  }
}

.small {
  font-size: 1rem;
}

p {
  text-align: center;
  font-size: 2rem;
}
</style>
