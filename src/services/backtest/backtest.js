// import getLexxLink from '../lexx/getLexxLink';
import getConfigs from './getConfigs';
import getTickers from '../binance/getTickers';
import filterTickersByVolume from '../binance/filterTickersByVolume';
import getTickerStats from './getTickerStats';
import getTimeStart from './getTimeStart';
import { configsHR, configsMR } from './configsSettings';

const backtest = async (
  customTickers,
  settings,
  binds,
  minimalVolume,
  minimalTradesCount,
  minimalPercentProfitableTrades,
  minimalProfitPercent,
  maximalDrawdown,
) => {
  const balance = 280;
  const allUsdtTickers = await getTickers('USDT');
  const tickersFilteredByVolume = await filterTickersByVolume(
    (customTickers || allUsdtTickers),
    minimalVolume,
  );

  const result = [];

  console.log('START: Backtest');
  console.time('BACKTEST TIME: ');

  // eslint-disable-next-line no-restricted-syntax
  for await (const setting of settings) {
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

    console.log(`Backtesting: ${interval} for ${currentConfig.length} configs`);

    // eslint-disable-next-line no-restricted-syntax
    for await (const ticker of tickersFilteredByVolume) {
      const bestConfig = await getTickerStats(
        balance,
        ticker,
        interval,
        binds,
        currentConfig,
        start,
        end,
        minimalTradesCount,
        maxBars,
        minimalPercentProfitableTrades,
        minimalProfitPercent,
        maximalDrawdown,
      );

      if (bestConfig) result.push(bestConfig);
    }
  }

  console.log('FINISH: Backtest');
  console.timeEnd('BACKTEST TIME: ');

  if (result.length > 0) {
    console.log(result.slice(0, 20));
  } else {
    console.log('Нет подходящих конфигов :(');
  }
};

export default backtest;
