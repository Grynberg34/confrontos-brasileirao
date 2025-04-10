import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Partida, PartidasState, PartidaRequest } from '../types/partidas';

const initialState: PartidasState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPartidas = createAsyncThunk(
  'partidas/fetch',
  async ({ timeX, timeY }: PartidaRequest) => {
    const response = await axios.post<Partida[]>(`${process.env.NEXT_PUBLIC_API_URL}confrontos`, { timeX, timeY });
    return response.data;
  }
);

const partidasSlice = createSlice({
  name: 'partidas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartidas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartidas.fulfilled, (state, action: PayloadAction<Partida[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPartidas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading';
      });
  },
});

export default partidasSlice.reducer;