import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RecordesState } from '../types/recordes';

const initialState: RecordesState = {
  winStreaks: [],
  unbeatenStreaks: [],
  lossStreaks: [],
  drawStreaks: [],
  homeWinStreaks: [],
  awayWinStreaks: [],
  bestFirstHalf: undefined,
  bestSecondHalf: undefined,
  bestHomeSeason: undefined,
  bestAwaySeason: undefined,
  mostWins: [],
  mostLosses: [],
  mostPoints: [],
  mostGoalsScored: [],
  mostDraws: [],
  mostGoalsAgainst: [],
  goleadas: [],
  loading: false,
  error: null,
};

export const fetchStreaks = createAsyncThunk(
  'recordes/fetchStreaks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}recordes/sequencias`);
      if (!response.data) {
        throw new Error('Invalid data received from the API');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error || 'Failed to fetch streaks');
    }
  }
);


export const fetchPerformances = createAsyncThunk(
  'recordes/fetchPerformances',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}recordes/melhores`);
      if (!response.data) {
        throw new Error('Invalid data received from the API');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error || 'Failed to fetch performances');
    }
  }
);

const recordesSlice = createSlice({
  name: 'recordes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStreaks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStreaks.fulfilled, (state, action) => {
        state.loading = false;
        state.winStreaks = action.payload.winStreaks || [];
        state.unbeatenStreaks = action.payload.unbeatenStreaks || [];
        state.lossStreaks = action.payload.lossStreaks || [];
        state.drawStreaks = action.payload.drawStreaks || [];
        state.homeWinStreaks = action.payload.homeWinStreaks || [];
        state.awayWinStreaks = action.payload.awayWinStreaks || [];
      })
      .addCase(fetchStreaks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPerformances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPerformances.fulfilled, (state, action) => {
        state.loading = false;
        state.bestFirstHalf = action.payload.bestFirstHalf;
        state.bestSecondHalf = action.payload.bestSecondHalf;
        state.bestHomeSeason = action.payload.bestHomeSeason;
        state.bestAwaySeason = action.payload.bestAwaySeason;
        state.goleadas = action.payload.topBlowoutGamesByDifference;
        state.mostWins = action.payload.mostWins;
        state.mostLosses = action.payload.mostLosses;
        state.mostPoints = action.payload.mostPoints;
        state.mostGoalsScored = action.payload.mostGoalsScored; 
        state.mostDraws = action.payload.mostDraws; 
        state.mostGoalsAgainst = action.payload.mostGoalsAgainst; 
      })
      .addCase(fetchPerformances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default recordesSlice.reducer;