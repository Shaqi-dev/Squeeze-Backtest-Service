import axios from 'axios';
import { API_EXCHANGE_INFO } from './api';

const getExchangeInfo = async () => {
  try {
    const res = await axios.get(API_EXCHANGE_INFO);
    return res.data;
  } catch (error) {
    throw new Error(`Couldn't fetch exchange info, received: ${error}`);
  }
};

export default getExchangeInfo;
