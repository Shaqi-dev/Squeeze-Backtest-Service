import getExchangeInfo from './getExchangeInfo';

const getSymbols = async () => {
  const data = await getExchangeInfo();

  return data.symbols;
};

export default getSymbols;
