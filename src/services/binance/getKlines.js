import axios from 'axios';
import { API_KLINES } from './api';

const getKlines = async (
  ticker,
  interval,
  start,
  end,
) => {
  const klines = [];

  let currentStartTime = start;

  // Parse klines data from binance
  const getData = async (startTime) => {
    try {
      const res = await axios.get(API_KLINES, {
        params: {
          symbol: ticker,
          interval,
          startTime,
          limit: 1000,
        },
      });

      const { data } = res;

      data.forEach((item) => klines.push(item.slice(0, 7)));

      // Update current start time to last bar time in the part of data
      currentStartTime = data[data.length - 1][6] + 1;
    } catch (error) {
      throw new Error(`Couldn't fetch ${ticker} klines data, received: ${error}`);
    }
  };

  while (currentStartTime < end) {
    // eslint-disable-next-line no-await-in-loop
    await getData(currentStartTime);
  }

  // Filter on duplicates
  const result = [
    ...new Set(
      klines.map((item) => JSON.stringify(item)),
    ),
  ].map((item) => JSON.parse(item));

  // Sort by date
  result.sort((a, b) => a[0] - b[0]);

  return result;
};

export default getKlines;
