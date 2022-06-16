import { configureStore } from '@reduxjs/toolkit';
import intervalsSettings from './intervalsSettings/intervalsSettingsSlice';

export default configureStore({
  reducer: {
    intervalsSettings,
  },
});
