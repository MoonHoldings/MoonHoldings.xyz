import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import 'animate.css'

import SolanaWallets from 'solana-wallets-vue'
import 'solana-wallets-vue/styles.css'

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

import {
  PhantomWalletAdapter,
  BackpackWalletAdapter,
  GlowWalletAdapter,
  CoinbaseWalletAdapter,
  BraveWalletAdapter,
  LedgerWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
} from '@solana/wallet-adapter-wallets'

import App from './App.vue'
import router from './router'

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new BackpackWalletAdapter(),
    new GlowWalletAdapter(),
    new CoinbaseWalletAdapter(),
    new BraveWalletAdapter(),
    new LedgerWalletAdapter(),
    new SolflareWalletAdapter(),
    new SolletWalletAdapter(),
  ],
  autoConnect: true,
}

const app = createApp(App)

app.use(pinia)
app.use(SolanaWallets, walletOptions)
app.use(router)

app.mount('#app')
