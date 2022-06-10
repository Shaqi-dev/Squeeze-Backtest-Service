import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setActive, setRange, setConfigs, setMaxBars,
} from '../../features/settings/settingsSlice';
import { CheckboxWithLabel, BasicSelect, BasicNumberField } from '../forms';
import './BacktestSettings.scss';

function BacktestSettings({ setting, forceUpdate }) {
  const {
    interval, range, configs, maxBars,
  } = setting;
  const dispatch = useDispatch();

  const rangeOptions = [
    { value: '12h', label: '12 hours' },
    { value: '24h', label: '24 hours' },
    { value: '48h', label: '48 hours' },
    { value: '72h', label: '72 hours' },
    { value: '1w', label: '1 week' },
    { value: '2w', label: '2 weeks' },
    { value: '4w', label: '4 weeks' },
  ];

  const configOptions = [
    { value: 'configsHR', label: 'High Risk' },
    { value: 'configsMR', label: 'Medium Risk' },
  ];

  const handleChangeCheckbox = (e) => {
    forceUpdate();
    dispatch(setActive({ interval, value: e.target.checked }));
  };

  const handleChangeRange = (e) => {
    forceUpdate();
    dispatch(setRange({ interval, value: e.target.value }));
  };

  const handleChangeConfigs = (e) => {
    forceUpdate();
    dispatch(setConfigs({ interval, value: e.target.value }));
  };

  const handleChangeMaxBars = (e) => {
    forceUpdate();
    dispatch(setMaxBars({ interval, value: e.target.value }));
  };

  return (
    <form id={interval} key={interval} className="settings-intervals__form">
      <CheckboxWithLabel
        key={`${interval}-active`}
        label={interval}
        className="settings-intervals__item"
        onChange={(e) => handleChangeCheckbox(e)}
      />
      <BasicSelect
        key={`${interval}-range`}
        options={rangeOptions}
        className="settings-intervals__item"
        defaultValue={range}
        minWidth={120}
        onChange={(e) => handleChangeRange(e)}
      />
      <BasicSelect
        key={`${interval}-configs`}
        options={configOptions}
        className="settings-intervals__item"
        defaultValue={configs}
        minWidth={120}
        onChange={(e) => handleChangeConfigs(e)}
      />
      <BasicNumberField
        key={`${interval}-max-bars`}
        type="number"
        className="settings-intervals__item"
        defaultValue={maxBars}
        minValue={0}
        maxValue={1000}
        minLength={1}
        maxLength={4}
        step={1}
        onChange={(e) => handleChangeMaxBars(e)}
      />
    </form>
  );
}

export default BacktestSettings;
