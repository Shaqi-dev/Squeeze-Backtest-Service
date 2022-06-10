import { API_STATS_24H } from './api';

const getVolume = async (ticker) => {
  const res = await fetch(`${API_STATS_24H}?symbol=${ticker}`);

  if (!res.ok) {
    throw new Error(`Couldn't fetch ${ticker} received: ${res.status}`);
  }

  return res.json().then((result) => result.quoteVolume);
};

export default getVolume;
