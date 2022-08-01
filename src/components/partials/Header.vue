<script setup></script>

<template>
  <div class="header">
    <div class="header__left">
      <RouterLink to="/">
        <img src="/svg/moon-holdings-logo.svg" alt="logo" />
        <span>MOONHOLDINGS.XYZ</span>
      </RouterLink>
      <nav>
        <ul>
          <li>
            <RouterLink to="/portfolio">PORTFOLIO</RouterLink>
          </li>
          <li>
            <RouterLink to="/portfolio">RANKS</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
    <div class="header__right">
      <button>
        <img src="/svg/icon-hamburger-menu.svg" alt="hamburger menu" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  min-height: 70px;
  background: var(--light-gray);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;

  &__left {
    display: flex;
    align-items: center;

    > a {
      display: flex;
      align-items: center;
      color: inherit;
      text-decoration: none;
      margin-right: 26px;

      img {
        height: 32px;
        margin-right: 20px;
      }
      span {
        font-size: 24px;
        font-weight: 600;
      }
    }
    nav {
      // border: 1px solid magenta;
      // display: flex;
      // align-items: center;

      ul {
        list-style: none;
        display: flex;

        li {
          &:first-child {
            font-size: 20px;
            font-weight: 600;
            margin-right: 15px;

            a {
              text-decoration: underline;
              color: var(--light-pink);
            }
          }
          &:nth-last-child(1) {
            font-size: 20px;
            font-weight: 700;

            a {
              text-decoration: none;
              color: #cccccc;
            }
          }
        }
      }
    }
  }
  &__right {
    button {
      border: none;
      background: none;

      img {
        height: 32px;
      }
    }
  }
}
</style>
