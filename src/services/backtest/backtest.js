import getLexxLink from '../lexx/getLexxLink';
import getConfigs from './utils/getConfigs';
import getTickers from '../binance/getTickers';
import filterTickersByVolume from './utils/filterTickersByVolume';
import getTickerStats from './getTickerStats';
import getTimeStart from './utils/getTimeStart';
import { configsHR, configsMR } from '../../utils/configsSettings';

const backtest = async (
  customTickers,
  settings,
  binds,
  minVolume,
  minTrades,
  minPercentProfitable,
  minProfitPercent,
  maxDrawdown,
) => {
  const allUsdtTickers = await getTickers('USDT');
  const tickersFilteredByVolume = await filterTickersByVolume(
    (customTickers || allUsdtTickers),
    minVolume,
  );

  const result = [];

  console.log('START: Backtest');
  console.time('BACKTEST TIME: ');

  const backtestTickers = async (tickers, interval, currentConfig, start, end, maxBars) => {
    const backtestTicker = async (ticker) => {
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

      if (bestConfig) return result.push(bestConfig);

      return null;
    };

    const promise = tickers.map(backtestTicker);

    await Promise.all(promise);
  };

  const backtestSetting = async (setting) => {
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

    // console.log(`Backtesting: ${interval} for ${currentConfig.length} configs`);

    await backtestTickers(tickersFilteredByVolume, interval, currentConfig, start, end, maxBars);
  };

  const promise = settings.map(backtestSetting);

  await Promise.all(promise);

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
