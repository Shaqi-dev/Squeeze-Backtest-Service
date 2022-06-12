import Trade from './Trade';
import getRoundNum from './getRoundNum';

class TradesStats {
  constructor(fees, balance, buyConfig, sellConfig, stopConfig) {
    this.fees = fees;
    this.buyConfig = getRoundNum(buyConfig, 2);
    this.sellConfig = getRoundNum(sellConfig, 2);
    this.stopConfig = getRoundNum(stopConfig, 2);
    this.initBalance = balance;
    this.prevBaseBalance = 0;
    this.baseBalance = balance;
    this.tradeBalance = 0;
    this.barsToSell = 0;
    this.maxBarsToSell = 0;
    this.barsTotal = 0;
    this.barsAvg = 0;
    this.closed = 0;
    this.stopped = 0;
    this.profitable = 0;
    this.currentDrawdawn = 0;
    this.maxDrawdawn = 0;
    this.currentTrade = null;
    this.trades = [];
  }

  getTradeAmount = (length) => getRoundNum(this.tradeBalance, length);

  getBaseAmount = () => getRoundNum(this.baseBalance, 2);

  getChangeAmount = () => getRoundNum(this.baseBalance - this.prevBaseBalance, 2);

  changePercent = () => getRoundNum(100 * (this.baseBalance / this.prevBaseBalance - 1), 2);

  percentProfitable = () => getRoundNum(100 * (this.profitable / this.closed), 2);

  profitAmount = () => getRoundNum(this.baseBalance - this.initBalance, 2);

  profitPercent = () => getRoundNum(100 * (this.baseBalance / this.initBalance) - 100, 2);

  barsAvgAmount = () => Math.round(this.barsTotal / this.closed);

  getTotalProfit() {
    const resAbsolute = getRoundNum(this.baseBalance - this.initBalance, 2);
    const resRelative = getRoundNum(100 * (this.baseBalance / this.initBalance - 1), 2);

    return resAbsolute >= 0
      ? `+$${resAbsolute} (+${resRelative}%)`
      : `-$${Math.abs(resAbsolute)} (${resRelative}%)`;
  }

  pushTrade(type, time, price, bar) {
    const data = {
      time,
      type,
      price,
      amount: this.getTradeAmount(),
      USD: this.getBaseAmount(),
      bar,
    };

    if (type === 'BUY') {
      return this.trades.push(data);
    }

    return this.trades.push({
      ...data,
      'Change, $': this.getChangeAmount(),
      'Change, %': this.changePercent(),
      'Current Drawdown, %': this.currentDrawdawn,
      bars: this.barsToSell || 'instant',
    });
  }

  // eslint-disable-next-line no-unused-vars
  openTrade(time, buy, sell, stop, bar) {
    this.currentTrade = new Trade(buy, sell, stop);
    this.barsToSell = 0;
    this.prevBaseBalance = this.getBaseAmount();
    this.tradeBalance = (this.baseBalance - (this.baseBalance * this.fees)) / buy;
    // this.pushTrade('BUY', time, buy, bar);
  }

  // eslint-disable-next-line no-unused-vars
  closeTrade(type, time, bar) {
    let price;

    if (type === 'SELL') {
      price = this.currentTrade.getSellOrder();
      this.baseBalance = (this.tradeBalance - (this.tradeBalance * this.fees)) * price;
      this.profitable += 1;
      this.updateCurrentDrawdawn();
    } else if (type === 'STOP') {
      price = this.currentTrade.getStopOrder();
      this.baseBalance = (this.tradeBalance * price) - (this.tradeBalance * price) * this.fees;
      this.stopped += 1;
      this.currentDrawdawn += this.changePercent();
      this.updateMaxDrawdawn();
    }

    this.updateMaxBars();
    // this.pushTrade(type, time, price, bar);
    this.closed += 1;
    this.currentTrade = null;
  }

  updateCurrentDrawdawn() {
    if (
      this.currentDrawdawn < 0
      && (this.currentDrawdawn + this.changePercent()) < 0
    ) {
      this.currentDrawdawn += this.changePercent();
    } else if (
      this.currentDrawdawn < 0
      && (this.currentDrawdawn + this.changePercent()) >= 0
    ) {
      this.currentDrawdawn = 0;
    }
  }

  updateMaxDrawdawn() {
    if (this.currentDrawdawn < this.maxDrawdawn) {
      this.maxDrawdawn = this.currentDrawdawn;
    }
  }

  updateMaxBars() {
    if (this.barsToSell > this.maxBarsToSell) {
      this.maxBarsToSell = this.barsToSell;
    }
  }

  continue() {
    this.barsToSell += 1;
    this.barsTotal += 1;
  }

  returnStats() {
    return {
      buy: this.buyConfig,
      sell: this.sellConfig,
      stop: this.stopConfig,
      closed: this.closed,
      profitable: this.profitable,
      stopped: this.stopped,
      percentProfitable: this.percentProfitable(),
      profitAmount: this.profitAmount(),
      profitPercent: this.profitPercent(),
      maxDrawdawn: getRoundNum(this.maxDrawdawn, 2),
      barsAvgAmount: this.barsAvgAmount(),
      maxBarsToSell: this.maxBarsToSell,
      // trades: this.trades,
    };
  }
}

export default TradesStats;
