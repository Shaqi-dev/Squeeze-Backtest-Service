import { API_KLINES } from './api';

const getKlinesData = async (ticker, interval, startTime, endTime) => {
  const klinesData = [];
  let currentStartTime = startTime;

  const getData = async (start) => {
    const res = await fetch(`${API_KLINES}?symbol=${ticker}&interval=${interval}&startTime=${start}&limit=1000`);

    await res.json().then((data) => {
      currentStartTime += (data[data.length - 1][6] + 1) - data[0][0];

      data.forEach((item) => klinesData.push(item.slice(0, 7)));
    });
  };

  await getData(currentStartTime);

  while (currentStartTime < endTime) {
    // eslint-disable-next-line no-await-in-loop
    await getData(currentStartTime);
  }

  const result = [...new Set(klinesData.map(
    (item) => JSON.stringify(item),
  ))].map((item) => JSON.parse(item));

  result.sort((a, b) => a[0] - b[0]);

  return result;
};

export default getKlinesData;
