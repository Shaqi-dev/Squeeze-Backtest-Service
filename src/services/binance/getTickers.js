import getSymbols from './getSymbols';
import tickersBlacklist from './tickersBlacklist';

const getTickers = async (quoteAsset) => {
  const symbols = await getSymbols();
  const tickers = [];

  symbols.forEach((item) => {
    if (
      item.quoteAsset === quoteAsset
      && item.status === 'TRADING'
      && tickersBlacklist.includes(item.symbol) === false
    ) {
      tickers.push(item.symbol);
    }
  });

  const sorted = tickers.sort();

  return sorted;
};

export default getTickers;
