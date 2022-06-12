class Trade {
  constructor(buy, sell, stop) {
    this.buy = buy;
    this.sell = sell;
    this.stop = stop;
  }

  getSellOrder = () => this.sell;

  getStopOrder = () => this.stop;
}

export default Trade;
