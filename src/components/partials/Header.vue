<script setup></script>

<template>
  <div class="header">
    <div class="header__pink-bar" />
    <div class="header__main">
      <div class="left-side">
        <div class="label">
          <span>
            Current supported chains:
          </span>
          <img src="/svg/icon-support-chain.svg" alt="chain-icon" />
        </div>

        <div class="style">
          <span>
            Portfolio display style:
          </span>
          <img src="/svg/icon-grid.svg" alt="chain-icon" />
          <img src="/svg/icon-list.svg" alt="chain-icon" />
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
  left: 200px;
  z-index: 90;
  font-family: 'Inter', monospace;

  &__pink-bar {
    height: 10px;
    background-color: #6D2E46;
  }

  &__main {
    min-height: 72px;
    padding: 28px 46px 10px 46px;
    display: flex;
    justify-content: space-between;

    .left-side {
      display: flex;
      align-items: center;
      gap: 20px;
      .label {
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        img {
          height: 28px;
        }
        span {
          margin-right: 4px;
          position: relative;
          bottom: 8px;
        }
      }
      .style {
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        img {
          height: 28px;
          margin-right: 8px;
          cursor: pointer;
        }
        span {
          margin-right: 4px;
          position: relative;
          bottom: 8px;
        }
      }
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
      .crypto-btns {
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
