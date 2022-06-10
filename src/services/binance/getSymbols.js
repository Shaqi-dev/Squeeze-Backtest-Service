import getExchangeInfo from './getExchangeInfo';

const getSymbols = async () => {
  const info = await getExchangeInfo();

  return info.symbols;
};

export default getSymbols;
