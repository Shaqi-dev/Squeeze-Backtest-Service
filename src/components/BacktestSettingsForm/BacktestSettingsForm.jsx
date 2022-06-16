import React from 'react';
import { useSelector } from 'react-redux';
import { selectIntervalsSettings } from '../../store/intervalsSettings/intervalsSettingsSlice';
import IntervalsSettingsLabels from '../IntervalsSettingsLabels';
import IntervalsSettingsItem from '../IntervalsSettingsItem';
import BacktestSettingsControls from '../BacktestSettingsControls';
import style from './BacktestSettingsForm.module.scss';

function BacktestSettingsForm() {
  const settings = useSelector(selectIntervalsSettings);
  const intervalsSettingsItems = settings.map((setting) => (
    <IntervalsSettingsItem key={setting.interval} setting={setting} />
  ));

  return (
    <form className={style.root}>
      <IntervalsSettingsLabels />
      {intervalsSettingsItems}
      <BacktestSettingsControls />
    </form>
  );
}

export default BacktestSettingsForm;
