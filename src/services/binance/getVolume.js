import axios from 'axios';
import { API_STATS_24H } from './api';

const getVolume = async (ticker) => {
  try {
    const res = await axios.get(`${API_STATS_24H}?symbol=${ticker}`);
    return res.data.quoteVolume;
  } catch (error) {
    throw new Error(`Couldn't fetch ${ticker} 24h volume stats, received: ${error}`);
  }
};

export default getVolume;
