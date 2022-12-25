import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import { MOON_HOLDINGS } from '@/constants/copy'
import { titleCreator } from '@/utils/formatters'
import cryptoJS from 'crypto-js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (Login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginView,
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/forgot-password',
      name: 'forgotPassword',
      component: () => import('@/views/ForgotPassword.vue'),
    },
    {
      path: '/reset-password',
      name: 'resetPassword',
      component: () => import('@/views/ResetPassword.vue'),
    },
    {
      path: '/crypto',
      name: 'crypto',
      component: () => import('@/views/Crypto.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/nfts/portfolio',
      name: 'nftsPortfolio',
      component: () => import('@/views/NftsPortfolio.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/nfts/portfolio/:name',
      name: 'nftsCollection',
      component: () => import('@/views/NftsCollection.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/nfts/single-collection',
      name: 'nftSingleItem',
      component: () => import('@/views/NftsSingleItem.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/calendar',
      name: 'calendar',
      beforeEnter: requireAuth,
    },
    {
      path: '/coin-swap',
      name: 'coin-swap',
      beforeEnter: requireAuth,
    },
    {
      path: '/ranks',
      name: 'ranks',
      beforeEnter: requireAuth,
    },
    {
      path: '/insights',
      name: 'insights',
      beforeEnter: requireAuth,
    },
    {
      path: '/nfts/lend-borrow',
      name: 'nftsLendBorrow',
      component: () => import('@/views/NftsLendBorrow.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicy,
    },
    {
      path: '/terms-of-service',
      name: 'terms-of-service',
      component: () => import('@/views/TermsOfService.vue'),
    },
    {
      path: '/newsletter-mail',
      name: 'newsletter-mail',
      component: () => import('@/views/Newsletter.vue'),
    },
  ],
})

router.beforeEach((to) => {
  document.title = to.name ? titleCreator(to.name) : MOON_HOLDINGS
})

function requireAuth(to, from, next) {
  let theSecret
  const user = localStorage.getItem('MOON_USER')

  const encryptedTwitterSecret = to.query.twitter_auth
  const encryptedDiscordSecret = to.query.discord_auth

  if (encryptedTwitterSecret) {
    const tSecretBytes = cryptoJS.AES.decrypt(
      encryptedTwitterSecret,
      import.meta.env.VITE_CRYPTO_SECRET
    )
    theSecret = tSecretBytes.toString(cryptoJS.enc.Utf8)
  }

  if (encryptedDiscordSecret) {
    const dSecretBytes = cryptoJS.AES.decrypt(
      encryptedDiscordSecret,
      import.meta.env.VITE_CRYPTO_SECRET
    )
    theSecret = dSecretBytes.toString(cryptoJS.enc.Utf8)
  }

  if (user || theSecret === 'chander-gopon-tottho') {
    next()
  } else {
    next('/')
  }
}

export default router
