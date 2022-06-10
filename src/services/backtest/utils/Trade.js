class Trade {
  constructor(fees, balance, buyPercent, sellPercent, stopPercent) {
    this.fees = fees;
    this.initBalance = balance;
    this.baseBalance = balance;
    this.buyPercent = Number(buyPercent).toFixed(2);
    this.sellPercent = Number(sellPercent).toFixed(2);
    this.stopPercent = Number(stopPercent).toFixed(2);
    this.tradeBalance = 0;
    this.startDate = null;
    this.prevBaseBalance = 0;
    this.openTime = null;
    this.closeTime = null;
    this.tradeIsOpen = false;
    this.buyOrder = null;
    this.sellOrder = null;
    this.stopOrder = null;
    this.barsToSell = 0;
    this.maxBarsToSell = 0;
    this.barsTotal = 0;
    this.barsAvg = 0;
    this.totalClosed = 0;
    this.totalStopped = 0;
    this.totalProfitable = 0;
    this.currentDrawdawn = 0;
    this.maxDrawdawn = 0;
    this.trades = [];
  }

  getTradeAmount = (length) => +Number(this.tradeBalance).toFixed(length);

  getBaseAmount() {
    return Number(this.baseBalance).toFixed(2);
  }

  getChangeAmount() {
    const res = Number(this.baseBalance - this.prevBaseBalance).toFixed(2);
    return +res;
  }

  changePercent() {
    const res = Number(100 * (this.baseBalance / this.prevBaseBalance - 1)).toFixed(2);
    return +res;
  }

  getTotalProfit() {
    const resAbsolute = Number(this.baseBalance - this.initBalance).toFixed(2);
    const resRelative = Number(
      100 * (this.baseBalance / this.initBalance - 1),
    ).toFixed(2);

    return resAbsolute >= 0 ? `+$${resAbsolute} (+${resRelative}%)` : `-$${Math.abs(resAbsolute)} (${resRelative}%)`;
  }

  percentProfitable() {
    return Number(100 * (this.totalProfitable / this.totalClosed)).toFixed(2);
  }

  barsAvgAmount() {
    return Math.round(this.barsTotal / this.totalClosed);
  }

  openTrade(openTime, buy, sell, stop, bar) {
    this.tradeIsOpen = true;
    this.barsToSell = 0;
    this.openTime = (new Date(openTime)).toLocaleString();
    this.buyOrder = buy;
    this.sellOrder = sell;
    this.stopOrder = stop;
    this.prevBaseBalance = this.getBaseAmount();
    this.tradeBalance = (this.baseBalance - (this.baseBalance * this.fees)) / this.buyOrder;
    this.trades.push({
      Time: this.openTime,
      Type: 'BUY',
      Price: this.buyOrder,
      Amount: this.getTradeAmount(),
      USD: this.getBaseAmount(),
      Bar: bar,
    });
  }

  closeTrade(openTime, bar) {
    this.tradeIsOpen = false;
    this.openTime = (new Date(openTime)).toLocaleString();
    this.baseBalance = (
      this.tradeBalance - (this.tradeBalance * this.fees)
    ) * this.sellOrder;
    this.totalClosed += 1;
    this.totalProfitable += 1;

    if (this.currentDrawdawn < 0 && (this.currentDrawdawn + this.changePercent()) < 0) {
      this.currentDrawdawn += this.changePercent();
    } else if (
      this.currentDrawdawn < 0
      && (this.currentDrawdawn + this.changePercent()
      ) >= 0) {
      this.currentDrawdawn = 0;
    }

    if (this.barsToSell > this.maxBarsToSell) {
      this.maxBarsToSell = this.barsToSell;
    }

    this.trades.push({
      Time: this.openTime,
      Type: 'SELL',
      Price: this.sellOrder,
      Amount: this.getTradeAmount(),
      USD: this.getBaseAmount(),
      'Change, $': this.getChangeAmount(),
      'Change, %': this.changePercent(),
      'Current Drawdown, %': this.currentDrawdawn,
      Bars: this.barsToSell ? this.barsToSell : 'instant',
      Bar: bar,
    });
  }

  stopTrade(openTime, bar) {
    this.tradeIsOpen = false;
    this.openTime = (new Date(openTime)).toLocaleString();
    this.baseBalance = (this.tradeBalance * this.stopOrder)
    - (this.tradeBalance * this.stopOrder) * this.fees;
    this.totalClosed += 1;
    this.totalStopped += 1;
    this.currentDrawdawn += this.changePercent();

    if (this.currentDrawdawn < this.maxDrawdawn) {
      this.maxDrawdawn = this.currentDrawdawn;
    }

    if (this.barsToSell > this.maxBarsToSell) {
      this.maxBarsToSell = this.barsToSell;
    }

    this.trades.push({
      Time: this.openTime,
      Type: 'STOP',
      Price: this.stopOrder,
      Amount: this.getTradeAmount(),
      USD: this.getBaseAmount(),
      'Change, $': this.getChangeAmount(),
      'Change, %': this.changePercent(),
      'Current Drawdown, %': this.currentDrawdawn,
      Bars: this.barsToSell ? this.barsToSell : 'instant',
      Bar: bar,
    });
  }

  continueTrade() {
    this.barsToSell += 1;
    this.barsTotal += 1;
  }

  returnStats() {
    return {
      buy: this.buyPercent,
      sell: this.sellPercent,
      stop: this.stopPercent,
      closed: this.totalClosed,
      profitable: this.totalProfitable,
      stopped: this.totalStopped,
      percentProfitable: this.percentProfitable(),
      profitAmount: Number(this.baseBalance - this.initBalance).toFixed(2),
      profitPercent: (100 * (this.baseBalance / this.initBalance) - 100).toFixed(2),
      maxDrawdawn: Number(this.maxDrawdawn).toFixed(2),
      barsAvgAmount: this.barsAvgAmount(),
      maxBarsToSell: this.maxBarsToSell,
      trades: this.trades,
    };
  }
}

export default Trade;
