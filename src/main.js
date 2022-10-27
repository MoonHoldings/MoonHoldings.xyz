import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'animate.css'

import SolanaWallets from 'solana-wallets-vue'
import 'solana-wallets-vue/styles.css'

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

import {
  PhantomWalletAdapter,
  GlowWalletAdapter,
  CoinbaseWalletAdapter,
} from '@solana/wallet-adapter-wallets'

import App from './App.vue'
import router from './router'

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new GlowWalletAdapter(),
    new CoinbaseWalletAdapter()
  ],
  autoConnect: true,
}

const app = createApp(App)

app.use(createPinia())
app.use(SolanaWallets, walletOptions)
app.use(router)

app.mount('#app')
