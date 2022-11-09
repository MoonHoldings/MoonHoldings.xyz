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

  for (let i = 0; i < weekInMS.length; i++) {
    const labelDate = dateForming(weekInMS[i])

    const foundHistory = userHistoriesObj?.coins_history?.find(
      (history) => history.date === labelDate
    )
    if (foundHistory) {
      historyValues[i] = await getTotalHistoryValue(foundHistory.coins)
    } else {
      historyValues[i] = undefined
    }
  }

  // if historyValues[0] doesn't exist, go backward by subtracting dateInMS
  if (historyValues[0] === undefined) {
    for (let i = 0; i < userHistoriesObj.coins_history.length; i++) {
      const singleHistory = userHistoriesObj.coins_history[i]

      const singleHistoryDateMS = new Date(singleHistory.date).getTime()

      if (singleHistoryDateMS < weekInMS[0]) {
        historyValues[0] = await getTotalHistoryValue(singleHistory.coins)

        break
      }
    }

    if (historyValues[0] === undefined) historyValues[0] = 0
  }

  // if any index is undefined then populate with the previous value
  for (let i = 0; i < historyValues.length; i++) {
    if (i !== 0 && historyValues[i] === undefined) {
      historyValues[i] = historyValues[i - 1]
    }
  }

  return {
    historyValues,
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

const getTotalHistoryValue = async (historyCoins) => {
  let valueSum = 0

  for (let i = 0; i < historyCoins.length; i++) {
    const response = await axios.get(
      `https://api.nomics.com/v1/currencies/ticker?key=${NOMICS_KEY}&ids=${historyCoins[i].id}&intervals=1d,30d`
    )

    const coin = response.data[0]
    const totalValue = coin.price * historyCoins[i].holdings
    valueSum += totalValue
  }

  return valueSum
}
