import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import { MOON_HOLDINGS } from '@/constants/copy'
import { titleCreator } from '@/utils/formatters'
import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

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
      path: '/nfts/portfolio/:address',
      name: 'nftsCollection',
      component: () => import('@/views/NftsCollection.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/nfts/single-collection/:address',
      name: 'nftSingleCollection',
      component: () => import('@/views/NftsSingleCollection.vue'),
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
  const user = cookies.get('MOON_USER')
  if (user) {
    next()
  }
  next('/')
}

export default router
