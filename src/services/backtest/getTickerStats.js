import getKlinesData from '../binance/getKlinesData';
import getConfigStats from './getConfigStats';
import getConfigRate from './getConfigRate';

const getTrades = async (
  balance,
  ticker,
  interval,
  binds,
  configs,
  startTime,
  endTime,
  barsToSell = 5,
  minimalTradesCount = 5,
  minimalPercentProfitableTrades = 20,
  minimalProfitPercent = 0,
  maximalDrawdown = -20,
// eslint-disable-next-line consistent-return
) => {
  const fees = 0.075 / 100;
  const data = await getKlinesData(ticker, interval, startTime, endTime);
  const result = [];

  binds.forEach((bind) => {
    const bindResult = [];

    configs.some((config) => {
      const stats = getConfigStats(data, config, bind, fees, balance);
      const {
        closed,
        percentProfitable,
        profitPercent,
        maxDrawdawn,
        maxBarsToSell,
      } = stats;

      // Stop configs backtest if trades count < minimal required
      if (closed < minimalTradesCount) {
        return true;
      }

      // Filter bad configs
      if (maxBarsToSell > barsToSell
          || percentProfitable < minimalPercentProfitableTrades
          || profitPercent < minimalProfitPercent
          || maxDrawdawn < maximalDrawdown) {
        return false;
      }

      const rate = getConfigRate(stats);

      return bindResult.push({
        ticker, interval, bind, ...stats, rate,
      });
    });

    // Sort and push current bind results
    if (bindResult.length > 0) {
      bindResult.sort((a, b) => b.rate - a.rate);
      bindResult.forEach((item) => result.push(item));
    }
  });

  if (result.length === 0) {
    console.log(`- - - ${ticker} ${interval} don't have a good configs - - -`);
  } else {
    result.sort((a, b) => b.rate - a.rate);

    const best = result[0];
    console.log(best);
    return best;
  }
};

export default getTrades;
