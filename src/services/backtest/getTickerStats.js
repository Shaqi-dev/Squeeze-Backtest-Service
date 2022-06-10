import getKlines from '../binance/getKlines';
import getBindBestResult from './getBindBestResult';

const getTickerStats = async (
  ticker,
  interval,
  binds,
  configs,
  startTime,
  endTime,
  barsToSell = 5,
  minTrades = 5,
  minPercentProfitable = 20,
  minProfitPercent = 0,
  maxDrawdown = -20,
) => {
  const result = [];

  const data = await getKlines(ticker, interval, startTime, endTime);

  const backtestBind = async (bind) => {
    const bindResult = await getBindBestResult(
      data,
      ticker,
      interval,
      bind,
      configs,
      barsToSell,
      minTrades,
      minPercentProfitable,
      minProfitPercent,
      maxDrawdown,
    );

    if (bindResult) return result.push(bindResult);

    return null;
  };

  const promises = binds.map(backtestBind);

  await Promise.all(promises);

  if (result.length === 0) {
    // console.log(`${ticker} ${interval} don't have a good configs`);
    return null;
  }

  result.sort((a, b) => b.rate - a.rate);
  return result[0];
};

export default getTickerStats;
