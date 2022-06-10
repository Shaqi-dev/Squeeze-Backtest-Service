function getLexxLink(stats) {
  const {
    ticker,
    interval,
    bind,
    buy,
    stop,
    sell,
  } = stats;
  return 'https://lexxtg.com/bot#t=s'
  + `&s=binance:${ticker}`
  + `&tf=${interval}`
  + `&bi=${bind.toLowerCase()}`
  + `&bt=${buy}`
  + `&st=${stop}`
  + `&sl=${sell}`
  + '&tc=r&as=1&tu=1&oc=1'
  + `&stt=${buy > 2 ? (buy - 1).toFixed(2) : 1}`
  + '&slc=0&slcp=0';
}

export default getLexxLink;
