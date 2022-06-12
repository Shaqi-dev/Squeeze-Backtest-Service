import getConfigStats from './getConfigStats';
import getConfigStatsRate from './utils/getConfigStatsRate';

const getBindBestResult = async (
  data,
  ticker,
  interval,
  bind,
  configs,
  maxBars,
  minTrades,
  minPercentProfitable,
  minProfitPercent,
  maxDrawdown,
) => {
  const result = [];

  configs.some((config) => {
    const stats = getConfigStats(data, config, bind);
    const {
      closed,
      percentProfitable,
      profitPercent,
      maxDrawdawn,
      maxBarsToSell,
    } = stats;

    // console.log(stats);

    // Stop configs backtest if trades count < minimal required
    if (closed < minTrades) {
      return true;
    }

    // Filter bad configs
    if (maxBarsToSell > maxBars
          || percentProfitable < minPercentProfitable
          || profitPercent < minProfitPercent
          || maxDrawdawn < maxDrawdown) {
      return false;
    }

    const rate = getConfigStatsRate(stats);

    result.push({
      ticker, interval, bind, ...stats, rate,
    });

    return false;
  });

  if (result.length > 0) {
    result.sort((a, b) => b.rate - a.rate);
    return result[0];
  }

  return null;
};

export default getBindBestResult;
