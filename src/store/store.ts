import { configureStore } from '@reduxjs/toolkit';
import partidasReducer from './slices/partidasSlice';
import timesReducer from './slices/timesSlice';
import tabelaReducer from './slices/tabelaSlice';

export const store = configureStore({
  reducer: {
    partidas: partidasReducer,
    times: timesReducer,
    tabela: tabelaReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;