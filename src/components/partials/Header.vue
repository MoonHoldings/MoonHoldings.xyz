<script setup></script>

<template>
  <div class="header">
    <div class="header__pink-bar" />
    <div class="header__main">
      <div class="left-side">
        <div class="logo">
          <img
            src="/svg/moon-holdings-logo-black.svg"
            alt="moonholdings logo"
          />
          <span>MoonHoldings</span>
        </div>
        <div class="portfolio-btns">
          <span>Portfolio:</span>
          <router-link to="#" class="coin-btn">
            <img src="/svg/icon-coins.svg" alt="coins icon" />
            <span>Coins</span>
          </router-link>
          <router-link to="#" class="nfts-btn">
            <img src="/svg/icon-diamond.svg" alt="diamond icon" />
            <span>NFTS</span>
          </router-link>
        </div>
      </div>
      <div class="right-side">
        <div class="menu">
          <img src="/svg/icon-hamburger-menu.svg" alt="hamburger menu" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
  font-family: 'Inter', monospace;

  &__pink-bar {
    height: 10px;
    background-color: var(--pink);
  }

  &__main {
    min-height: 72px;
    padding: 28px 46px 10px 46px;
    display: flex;
    justify-content: space-between;

    .left-side {
      display: flex;
      align-items: center;
      .logo {
        font-size: 16px;
        font-weight: 700;
        margin-right: 42px;

        img {
          height: 28px;
          margin-right: 10px;
        }
        span {
          position: relative;
          bottom: 5px;
        }
      }
      .portfolio-btns {
        display: flex;
        align-items: center;
        & > span {
          text-transform: uppercase;
          font-weight: 700;
          font-size: 12px;
          line-height: 15px;
          color: #878787;
          margin-right: 15px;
        }
        a {
          display: flex;
          align-items: center;
          text-decoration: none;
          img {
            width: 31px;
            margin-right: 8px;
          }
          & > span {
            text-transform: uppercase;
            font-weight: 700;
            font-size: 16px;
            line-height: 15px;
            color: var(--ash);
            margin-right: 15px;
          }
        }
        .coin-btn {
          & > span {
            color: var(--pink) !important;
          }
        }
      }
    }
    .right-side {
      .menu {
        img {
          height: 35px;
        }
      }
    }
  }
}
</style>
