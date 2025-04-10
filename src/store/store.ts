import { configureStore } from '@reduxjs/toolkit';
import partidasReducer from './slices/partidasSlice';
import timesReducer from './slices/timesSlice';

export const store = configureStore({
  reducer: {
    partidas: partidasReducer,
    times: timesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;