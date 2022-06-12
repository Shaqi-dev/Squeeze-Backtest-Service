import getVolume from '../../binance/getVolume';

const filterTickersByVolume = async (tickers, minimalVolume) => {
  const result = [];

  console.time('FILTERING TIME: ');
  console.log('START: filtering tickers by volume');

  const checkVolume = async (ticker) => {
    const volume = await getVolume(ticker);

    if (volume / 1000000 > minimalVolume) {
      result.push(ticker);
    }
  };

  const promises = tickers.map(checkVolume);

  await Promise.all(promises);

  console.log('FINISH: filtering tickers by volume');
  console.log(`RESULT: ${result.length} tickers`);
  console.timeEnd('FILTERING TIME: ');

  return result;
};

export default filterTickersByVolume;
