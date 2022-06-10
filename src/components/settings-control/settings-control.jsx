import React from 'react';
import Button from '@mui/material/Button';
import backtest from '../../services/backtest';
import './settings-control.css';

export default function SettingsControl({ activeSettings }) {
  const binds = ['O', 'H', 'L', 'C', 'HL', 'OC'];
  const minimalVolume = 10;
  const minimalTradesCount = 5;
  const minimalPercentProfitableTrades = 60;
  const minimalProfitPercent = 0;
  const maximalDrawdown = -5;

  const handleStartBacktest = () => {
    backtest(
      ['LITUSDT', 'EPXUSDT', 'LUNAUSDT'],
      activeSettings,
      binds,
      minimalVolume,
      minimalTradesCount,
      minimalPercentProfitableTrades,
      minimalProfitPercent,
      maximalDrawdown,
    );
  };

  const handleCheckSettings = () => {
    console.log('Active settings:', activeSettings);
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
