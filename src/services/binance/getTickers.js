import getSymbols from './getSymbols';
import blacklist from '../../utils/tickersBlacklist';

const getTickers = async (quoteAsset) => {
  const symbols = await getSymbols();
  const tickers = [];

  symbols.forEach((item) => {
    if (
      item.quoteAsset === quoteAsset
      && item.status === 'TRADING'
      && blacklist.includes(item.symbol) === false
    ) {
      tickers.push(item.symbol);
    }
  });

  tickers.sort();

  return tickers;
};

export default getTickers;
