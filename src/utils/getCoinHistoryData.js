import axios from 'axios'

const NOMICS_KEY = import.meta.env.VITE_NOMICS_KEY
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const dateInMS = 86400000
const presentDayMS = Date.now()

export default async (historicalData, email) => {
  const historyValues = []
  const dateLabels = []

  const userHistoriesObj = historicalData.find(
    (history) => history.email === email
  )
  const weekInMS = []

  //populate dateLabels
  for (let i = 0; i < 7; i++) {
    const dateMS = presentDayMS - dateInMS * (7 - i)
    const dateJS = new Date(dateMS)
    const dayNum = dateJS.getDay()
    const day = days[dayNum]
    const date = dateJS.getDate()

    dateLabels[i] = `${day} ${date}`
    weekInMS[i] = dateMS
  }

  // populate indexes where weekInMS[i] matches
  for (let i = 0; i < weekInMS.length; i++) {
    const labelDate = dateForming(weekInMS[i])

    const foundHistory = userHistoriesObj?.coins_history?.find(
      (history) => history.date === labelDate
    )
    if (foundHistory) {
      historyValues[i] = {
        coins: foundHistory.coins,
        date: foundHistory.date,
      }
    } else {
      historyValues[i] = undefined
    }
  }

  // if historyValues[0] doesn't exist, go backward by subtracting dateInMS
  let leastGap0 = 0
  let the0History
  if (historyValues[0] === undefined) {
    for (let i = 0; i < userHistoriesObj.coins_history.length; i++) {
      const singleHistory = userHistoriesObj.coins_history[i]

      const singleHistoryDateMS = new Date(singleHistory.date).getTime()

      const subtract = weekInMS[0] - singleHistoryDateMS

      if (singleHistoryDateMS < weekInMS[0] && leastGap0 === 0) {
        leastGap0 = subtract
      }

      if (
        leastGap0 !== 0 &&
        singleHistoryDateMS < weekInMS[0] &&
        subtract < leastGap0
      ) {
        leastGap0 = subtract
        the0History = singleHistory
      }
    }
    if (leastGap0 === 0) historyValues[0] = 0

    historyValues[0] = the0History
  }

  // if any index is undefined then populate with the previous value
  for (let i = 0; i < historyValues.length; i++) {
    if (i !== 0 && historyValues[i] === undefined) {
      historyValues[i] = historyValues[i - 1]
    }
  }

  const finalHValues = []
  for (let i = 0; i < historyValues.length; i++) {
    if (historyValues[i] === 0) finalHValues[i] = 0

    const val = await getTotalHistoryValue(historyValues[i].coins, weekInMS[i])
    finalHValues[i] = val
  }

  return {
    historyValues: finalHValues,
    dateLabels,
  }
}

const dateForming = (toBeFormedMS) => {
  const df_dateJS = new Date(toBeFormedMS)
  const df_month = df_dateJS.getMonth()
  const df_date = df_dateJS.getDate()
  const df_year = df_dateJS.getFullYear()

  return `${df_month + 1}-${df_date}-${df_year}`
}

const getTotalHistoryValue = async (historyCoins, candleDayMS) => {
  let valueSum = 0

  const c_iso_date = new Date(candleDayMS)
  const c_year = c_iso_date.getFullYear()
  const c_month = c_iso_date.getMonth()
  const c_date = c_iso_date.getDate()
  const candleDate = `${c_year}-${
    c_month + 1 > 9 ? c_month + 1 : '0' + (c_month + 1)
  }-${c_date > 9 ? c_date : '0' + c_date}T00:00:00Z`

  for (let i = 0; i < historyCoins.length; i++) {
    const response = await axios.get(
      `https://api.nomics.com/v1/candles?key=${NOMICS_KEY}&interval=1d&currency=${historyCoins[i].id}&start=${candleDate}&end=${candleDate}`
    )

    if (response.data.length === 0) {
      const unchangedCoinRes = await axios.get(
        `https://api.nomics.com/v1/currencies/ticker?key=${NOMICS_KEY}&ids=${historyCoins[i].id}&intervals=1d,30d`
      )
      const unchangedCoin = unchangedCoinRes.data[0]

      const totalValue = unchangedCoin?.price * historyCoins[i].holdings
      valueSum += totalValue
    } else {
      const coinPrice = await response.data[0]
      const totalValue = coinPrice?.close * historyCoins[i].holdings
      valueSum += totalValue
    }
  }

  return valueSum
}
