import axios from 'axios'

export default async (cryptoCoins) => {
  const NOMICS_KEY = import.meta.env.VITE_NOMICS_KEY
  const updatedCoins = []

  for (let i = 0; i < cryptoCoins.length; i++) {
    const response = await axios.get(
      `https://api.nomics.com/v1/currencies/ticker?key=${NOMICS_KEY}&ids=${cryptoCoins[i].id}&intervals=1d,30d`
    )

    const fetchedCoin = await response.data[0]

    const allWallets = cryptoCoins[i].wallets
    const updatedWallets = allWallets?.map((wallet) => {
      const updatedValue = fetchedCoin.price * Number(wallet.holding)
      return { ...wallet, value: updatedValue }
    })

    let newTotalValue = 0
    updatedWallets?.forEach((wallet) => {
      newTotalValue += wallet.value
    })

    const _24hr = fetchedCoin['1d'] ? fetchedCoin['1d']['price_change_pct'] : ''

    const updatedCoin = {
      ...cryptoCoins[i],
      _24hr,
      price: fetchedCoin.price,
      totalValue: newTotalValue,
    }

    updatedCoins.push(updatedCoin)
  }

  return updatedCoins
}
