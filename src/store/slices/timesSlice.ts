import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TimesState } from '../types/times'

export const fetchTimes = createAsyncThunk('times/fetchAll', async () => {
  const response = await axios.get<string[]>(`${process.env.NEXT_PUBLIC_API_URL}confrontos`);
  return response.data;
});

const initialState: TimesState = {
  list: [],
  timeX: null,
  timeY: null,
  loading: false,
  error: null,
};

const timesSlice = createSlice({
  name: 'times',
  initialState,
  reducers: {
    addTime: (state, action) => {
      if (!state.timeX) {
        state.timeX = action.payload;
      } else if (!state.timeY) {
        state.timeY = action.payload;
      }
    },
    resetTimes: (state) => {
      state.timeX = null;
      state.timeY = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading';
      });
  },
});

export const { addTime, resetTimes } = timesSlice.actions;

export default timesSlice.reducer;