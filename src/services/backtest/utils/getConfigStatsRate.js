const getConfigStatsRate = (stats) => (
  +Number(
    stats.buy * 0.1
  + (stats.sell / stats.stop) * 0.2
  + stats.closed * 0.1
  + stats.profitable * 0.05
  - stats.stopped * 0.1
  + stats.percentProfitable * 0.01
  + stats.profitPercent * 0.25
  + stats.maxDrawdawn * 0.5
  - (stats.barsAvgAmount > 1 ? stats.barsAvgAmount * 0.1 : 0)
  - stats.maxBarsToSell * 0.01,
  ).toFixed(2)
);

export default getConfigStatsRate;
