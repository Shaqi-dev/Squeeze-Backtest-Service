import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    interval: '1m',
    active: false,
    range: 'last48h',
    configs: 'configsHR',
    maxBars: 15,
  },
  {
    interval: '3m',
    active: false,
    range: 'last48h',
    configs: 'configsHR',
    maxBars: 10,
  },
  {
    interval: '5m',
    active: false,
    range: 'last72h',
    configs: 'configsMR',
    maxBars: 12,
  },
  {
    interval: '15m',
    active: false,
    range: 'last72h',
    configs: 'configsMR',
    maxBars: 8,
  },
];

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setActive: (state, action) => {
      const { interval, value } = action.payload;
      const setting = state.find((settings) => settings.interval === interval);

      setting.active = value;
    },
    setRange: (state, action) => {
      const { interval, value } = action.payload;
      const setting = state.find((settings) => settings.interval === interval);

      setting.range = value;
    },
    setConfigs: (state, action) => {
      const { interval, value } = action.payload;
      const setting = state.find((settings) => settings.interval === interval);

      setting.configs = value;
    },
    setMaxBars: (state, action) => {
      const { interval, value } = action.payload;
      const setting = state.find((settings) => settings.interval === interval);

      setting.maxBars = value;
    },
  },
});

export const {
  setActive,
  setRange,
  setConfigs,
  setMaxBars,
} = settingsSlice.actions;

export default settingsSlice.reducer;
