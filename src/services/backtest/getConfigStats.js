import Trade from './Trade';

const getConfigStats = (
  data,
  config,
  bind,
  fees,
  balance,
) => {
  const [buyPercent, sellPercent, stopPercent] = config;
  const trade = new Trade(fees, balance, buyPercent, sellPercent, stopPercent);

  // Backtest current config for each bar
  data.forEach((bar, i, arr) => {
    const [openTime,, high, low, close] = bar;

    if (i > 0) {
      trade.startDate = openTime;
      const prevBar = arr[i - 1];

      let bindValue;

      switch (bind.toLowerCase()) {
        case 'o':
          bindValue = +prevBar[1];
          break;
        case 'h':
          bindValue = +prevBar[2];
          break;
        case 'l':
          bindValue = +prevBar[3];
          break;
        case 'c':
          bindValue = +prevBar[4];
          break;
        case 'hl':
          bindValue = ((+prevBar[2] + +prevBar[3]) / 2);
          break;
        case 'oc':
          bindValue = ((+prevBar[1] + +prevBar[4]) / 2);
          break;
        default: bindValue = ((+prevBar[1] + +prevBar[4]) / 2);
      }

      const buy = bindValue - bindValue * (buyPercent / 100);
      const sell = buy * (1 + (sellPercent / 100));
      const stop = buy - buy * (stopPercent / 100);

      const getModifiedBar = (item) => [
        (new Date(item[0])).toLocaleString(),
        ...item.slice(1, 6),
        (new Date(item[6] + 1)).toLocaleString(),
        Number(buy).toFixed(item[1].length - 2),
        Number(sell).toFixed(item[1].length - 2),
        Number(stop).toFixed(item[1].length - 2),
      ];

      if (trade.tradeIsOpen) {
        trade.continueTrade();
        if (+low <= +trade.stopOrder) {
          trade.stopTrade(openTime, getModifiedBar(bar));
        } else if (+high >= +trade.sellOrder) {
          trade.closeTrade(openTime, getModifiedBar(bar));
        }
      } else if (!trade.tradeIsOpen && +low <= +buy) {
        trade.openTrade(openTime, buy, sell, stop, getModifiedBar(bar));
        if (+low <= +trade.stopOrder) {
          trade.stopTrade(openTime, getModifiedBar(bar));
        } else if (+close >= +trade.sellOrder) {
          trade.closeTrade(openTime, getModifiedBar(bar));
        }
      }
    }
  });

  return trade.returnStats();
};

export default getConfigStats;
