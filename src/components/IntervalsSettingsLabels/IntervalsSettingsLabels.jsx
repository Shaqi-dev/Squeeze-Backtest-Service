import React from 'react';
import style from './IntervalsSettingsLabels.module.scss';

function IntervalsSettingsLabels() {
  return (
    <ul className={style.root}>
      <li>Interval</li>
      <li>Range</li>
      <li>Configs</li>
      <li>Max bars</li>
    </ul>
  );
}

export default IntervalsSettingsLabels;
