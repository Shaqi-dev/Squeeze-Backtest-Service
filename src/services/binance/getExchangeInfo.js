import { API_EXCHANGE_INFO } from './api';

const getExchangeInfo = async () => {
  const res = await fetch(API_EXCHANGE_INFO);

  if (!res.ok) {
    throw new Error(`Couldn't fetch exchange info, received: ${res.status}`);
  }

  return res.json();
};

export default getExchangeInfo;
