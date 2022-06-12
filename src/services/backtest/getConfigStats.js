import TradesStats from './utils/TradesStats';
import getBindPrice from './utils/getBindValue';

const getConfigStats = (
  data,
  config,
  bind,
) => {
  const [buyPercent, sellPercent, stopPercent] = config;
  const balance = 280;
  const fees = 0.075 / 100;
  const stats = new TradesStats(fees, balance, buyPercent, sellPercent, stopPercent);

  // Backtest current config for each bar
  data.forEach((bar, i, arr) => {
    const [openTime, open, high, low, close, closeTime] = bar;

    // Starting from second bar
    if (i > 0) {
      const prevBar = arr[i - 1];
      const bindPrice = getBindPrice(bind, prevBar);
      const buy = bindPrice - bindPrice * (buyPercent / 100);
      const sell = buy * (1 + (sellPercent / 100));
      const stop = buy - buy * (stopPercent / 100);

      const openTimeString = (new Date(openTime)).toLocaleString();
      const closeTimeString = (new Date(closeTime + 1)).toLocaleString();
      const getRoundPrice = (price) => Number(price).toFixed(open.length - 2);
      const modifiedBar = [
        openTimeString,
        ...bar.slice(1, 5),
        closeTimeString,
        getRoundPrice(buy),
        getRoundPrice(sell),
        getRoundPrice(stop),
      ];

      const { currentTrade } = stats;
      const stopOrder = currentTrade && +currentTrade.getStopOrder();
      const sellOrder = currentTrade && +currentTrade.getSellOrder();

      const buyCondition = +low <= +buy;
      const sellCondition = +high >= sellOrder;
      const instantSellCondition = +close >= sell;
      const stopCondition = +low <= stopOrder;
      const instantStopCondition = +low <= stop;

      // Main trading logic
      if (currentTrade) {
        stats.continue();
        if (stopCondition) {
          stats.closeTrade('STOP', openTimeString, modifiedBar);
        } else if (sellCondition) {
          stats.closeTrade('SELL', openTimeString, modifiedBar);
        }
      } else if (currentTrade === null && buyCondition) {
        stats.openTrade(openTimeString, buy, sell, stop, modifiedBar);
        if (instantStopCondition) {
          stats.closeTrade('STOP', openTimeString, modifiedBar);
        } else if (instantSellCondition) {
          stats.closeTrade('SELL', openTimeString, modifiedBar);
        }
      }
    }
  });

  return stats.returnStats();
};

export default getConfigStats;
