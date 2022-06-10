import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BacktestSettings from '../backtestSettings';
import SettingsControl from '../settings-control';
import './Backtest.scss';

function Backtest() {
  const settings = useSelector((state) => state.settings);
  const activeSettings = settings
    .filter((setting) => setting.active);

  function useForceUpdate() {
    const [, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  const intervalsSettingsForms = settings
    .map((setting) => (
      <BacktestSettings
        key={setting.interval}
        setting={setting}
        forceUpdate={forceUpdate}
      />
    ));

  return (
    <>
      <div className="backtest__intervals settings-intervals">
        <ul className="settings-intervals__labels">
          <li>Interval</li>
          <li>Range</li>
          <li>Configs</li>
          <li>Max bars</li>
        </ul>
        {intervalsSettingsForms}
      </div>
      <SettingsControl activeSettings={activeSettings} />
    </>
  );
}

export default Backtest;
