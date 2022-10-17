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
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/ResetPassword.vue'),
    },
    {
      path: '/crypto',
      name: 'crypto',
      component: () => import('@/views/Crypto.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/nfts/collection',
      name: 'nftsCollection',
      component: () => import('@/views/NftsCollection.vue'),
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
  const user = cookies.get('user')
  if (user) {
    next()
  }
  next('/')
}

export default router
