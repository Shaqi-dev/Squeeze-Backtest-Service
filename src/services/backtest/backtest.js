import getLexxLink from '../lexx/getLexxLink';
import getConfigs from './utils/getConfigs';
import getTickers from '../binance/getTickers';
import filterTickersByVolume from './utils/filterTickersByVolume';
import getTickerStats from './getTickerStats';
import getTimeStart from './utils/getTimeStart';
import { configsHR, configsMR } from '../../utils/configsSettings';

const backtest = async (settings) => {
  const USDTtickers = await getTickers('USDT');
  const {
    tickers,
    binds,
    activeSettings,
    minVolume,
    minTrades,
    minPercentProfitable,
    minProfitPercent,
    maxDrawdown,
  } = settings;
  const tickersFilteredByVolume = await filterTickersByVolume(
    (tickers || USDTtickers),
    minVolume,
  );

  const result = [];

  console.log('START: Backtest');
  console.time('BACKTEST TIME: ');

  // const backtestTickers = async (
  //   currentTickers, interval, currentConfig, start, end, maxBars
  // ) => {
  //   const backtestTicker = async (ticker) => {
  //     const bestConfig = await getTickerStats(
  //       ticker,
  //       interval,
  //       binds,
  //       currentConfig,
  //       start,
  //       end,
  //       maxBars,
  //       minTrades,
  //       minPercentProfitable,
  //       minProfitPercent,
  //       maxDrawdown,
  //     );

  //     if (bestConfig) return result.push(bestConfig);

  //     return null;
  //   };

  //   const promise = currentTickers.map(backtestTicker);

  //   await Promise.all(promise);
  // };

  // eslint-disable-next-line no-restricted-syntax
  const backtestTickers = async (
    tickersArr,
    interval,
    currentConfig,
    start,
    end,
    maxBars,
  ) => {
    // eslint-disable-next-line no-restricted-syntax
    for await (const ticker of tickersArr) {
      const bestConfig = await getTickerStats(
        ticker,
        interval,
        binds,
        currentConfig,
        start,
        end,
        maxBars,
        minTrades,
        minPercentProfitable,
        minProfitPercent,
        maxDrawdown,
      );

      if (bestConfig) result.push(bestConfig);
    }
  };
  // const backtestSetting = async (setting) => {
  //   const {
  //     interval, range, configs, maxBars,
  //   } = setting;

  //   const start = getTimeStart(range);
  //   const end = Date.now();

  //   // Init config
  //   let currentConfig;

  //   switch (configs) {
  //     case 'configsHR':
  //       currentConfig = getConfigs(configsHR);
  //       break;
  //     case 'configsMR':
  //       currentConfig = getConfigs(configsMR);
  //       break;
  //     default: currentConfig = getConfigs(configsHR);
  //   }

  //   await backtestTickers(tickersFilteredByVolume, interval, currentConfig, start, end, maxBars);
  // };

  // const promise = activeSettings.map(backtestSetting);

  // await Promise.all(promise);

  // eslint-disable-next-line no-restricted-syntax
  for await (const setting of activeSettings) {
    const {
      interval, range, configs, maxBars,
    } = setting;

    const start = getTimeStart(range);
    const end = Date.now();

    // Init config
    let currentConfig;

    switch (configs) {
      case 'configsHR':
        currentConfig = getConfigs(configsHR);
        break;
      case 'configsMR':
        currentConfig = getConfigs(configsMR);
        break;
      default: currentConfig = getConfigs(configsHR);
    }

    await backtestTickers(tickersFilteredByVolume, interval, currentConfig, start, end, maxBars);
  }

  console.log('FINISH: Backtest');
  console.timeEnd('BACKTEST TIME: ');

  if (result.length > 0) {
    result.sort((a, b) => b.rate - a.rate);
    result.slice(0, 20).forEach((item) => {
      console.log(item);
      console.log(getLexxLink(item));
    });
  } else {
    console.log('Нет подходящих конфигов :(');
  }
};

export default backtest;
