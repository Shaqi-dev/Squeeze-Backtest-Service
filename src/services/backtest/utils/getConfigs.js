function getConfigs([
  buySettings,
  sellSettings,
  stopSettings,
  maxSellRate,
  maxStopRate,
]) {
  const getRange = (start, end, step) => (
    Array.from(
      { length: ((end - start) / step) + 1 },
      (_v, k) => Math.round((k * step + start) * 10) / 10,
    )
  );

  const buyRange = getRange(...buySettings);
  const sellRange = getRange(...sellSettings);
  const stopRange = getRange(...stopSettings);
  const configs = [];

  buyRange.forEach((buyValue) => {
    sellRange.forEach((sellValue) => {
      stopRange.forEach((stopValue) => {
        const goodBuyRate = buyValue * maxSellRate >= sellValue;
        const goodSellRate = sellValue * maxStopRate >= stopValue;

        if (goodBuyRate && goodSellRate) {
          configs.push([buyValue, sellValue, stopValue]);
        }
      });
    });
  });

  return configs;
}

export default getConfigs;
