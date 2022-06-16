import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setActive, setRange, setConfigs, setMaxBars,
} from '../../store/intervalsSettings/intervalsSettingsSlice';
import SettingsInputCheckbox from '../SettingsInputCheckbox';
import SettingsInputSelect from '../SettingsInputSelect';
import SettingsInputNumber from '../SettingsInputNumber';
import { backtestTimeRangeOptions, backtestConfigOptions } from '../../utils';
import style from './IntervalsSettingsItem.module.scss';

function IntervalsSettingsItem({ setting }) {
  const dispatch = useDispatch();
  const {
    interval, active, range, configs, maxBars,
  } = setting;

  const handleCheckbox = (e) => {
    dispatch(setActive({ interval, active: e.target.checked }));
  };

  const handleRange = (e) => {
    dispatch(setRange({ interval, range: e.target.value }));
  };

  const handleConfigs = (e) => {
    dispatch(setConfigs({ interval, configs: e.target.value }));
  };

  const handleMaxBars = (value) => {
    dispatch(setMaxBars({ interval, maxBars: value }));
  };

  return (
    <div className={style.root}>
      <SettingsInputCheckbox
        key={`${interval}-active`}
        label={interval}
        onChange={handleCheckbox}
        checked={active}
        className="settings-intervals__item"
      />
      <SettingsInputSelect
        key={`${interval}-range`}
        options={backtestTimeRangeOptions}
        className="settings-intervals__item"
        value={range}
        onChange={handleRange}
      />
      <SettingsInputSelect
        key={`${interval}-configs`}
        options={backtestConfigOptions}
        className="settings-intervals__item"
        value={configs}
        onChange={handleConfigs}
      />
      <SettingsInputNumber
        key={`${interval}-max-bars`}
        type="number"
        className="settings-intervals__item"
        value={maxBars}
        min={0}
        max={1000}
        minLength={1}
        maxLength={4}
        step={1}
        onChange={handleMaxBars}
      />
    </div>
  );
}

export default IntervalsSettingsItem;
