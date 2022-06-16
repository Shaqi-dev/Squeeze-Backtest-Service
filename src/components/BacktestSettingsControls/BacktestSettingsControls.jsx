import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { selectIntervalsSettingsActive } from '../../store/intervalsSettings/intervalsSettingsSlice';
import backtest from '../../services/backtest';
import './BacktestSettingsControls.scss';

function BacktestSettingsControls() {
  const activeSettings = useSelector(selectIntervalsSettingsActive);
  const backtestSettings = {
    tickers: null,
    activeSettings,
    binds: ['O', 'H', 'L', 'C', 'HL', 'OC'],
    minVolume: 10,
    minTrades: 5,
    minPercentProfitable: 60,
    minProfitPercent: 0,
    maxDrawdown: -5,
  };

  const handleStartBacktest = () => {
    backtest(backtestSettings);
  };

  const handleCheckSettings = () => {
    console.log(activeSettings);
  };

  return (
    <div className="settings-control">
      <Button
        variant="contained"
        className="settings-control__button"
        onClick={handleStartBacktest}
      >
        Start Backtest
      </Button>
      <Button
        variant="outlined"
        className="settings-control__button settings-control__button_outlined"
        onClick={handleCheckSettings}
      >
        Check Settings
      </Button>
    </div>
  );
}

export default BacktestSettingsControls;
