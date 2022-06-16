import { createSlice } from '@reduxjs/toolkit';
import initialState from './intervalsSettings';

const intervalsSettingsSlice = createSlice({
  name: 'intervalsSettings',
  initialState,
  reducers: {
    setActive: (state, action) => {
      const { interval, active } = action.payload;
      const setting = state.find((settings) => settings.interval === interval);

      setting.active = active;
    },
    setRange: (state, action) => {
      const { interval, range } = action.payload;
      const setting = state.find((settings) => settings.interval === interval);

      setting.range = range;
    },
    setConfigs: (state, action) => {
      const { interval, configs } = action.payload;
      const setting = state.find((settings) => settings.interval === interval);

      setting.configs = configs;
    },
    setMaxBars: (state, action) => {
      const { interval, maxBars } = action.payload;
      const setting = state.find((settings) => settings.interval === interval);

      setting.maxBars = maxBars;
    },
  },
});

export const {
  setActive,
  setRange,
  setConfigs,
  setMaxBars,
} = intervalsSettingsSlice.actions;

export const selectIntervalsSettings = (state) => state.intervalsSettings;
export const selectIntervalsSettingsActive = (state) => state.intervalsSettings
  .filter((setting) => setting.active);

export default intervalsSettingsSlice.reducer;
