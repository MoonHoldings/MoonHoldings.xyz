import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import SolanaWallets from 'solana-wallets-vue'

import App from './App.vue'
import router from './router'

import 'solana-wallets-vue/styles.css'
import 'animate.css'
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

console.log('import.meta.env', import.meta.env)

import {
  PhantomWalletAdapter,
  BackpackWalletAdapter,
  ExodusWalletAdapter,
  GlowWalletAdapter,
  CoinbaseWalletAdapter,
  BraveWalletAdapter,
  LedgerWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
} from '@solana/wallet-adapter-wallets'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new BackpackWalletAdapter(),
    new ExodusWalletAdapter(),
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
