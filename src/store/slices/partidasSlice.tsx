import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { PartidasState, PartidaRequest, ConfrontosData } from '../types/partidas';

const initialState: PartidasState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchPartidas = createAsyncThunk(
  'partidas/fetch',
  async ({ timeX, timeY }: PartidaRequest) => {
    const response = await axios.post<ConfrontosData>(`${process.env.NEXT_PUBLIC_API_URL}confrontos`, { timeX, timeY });
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
      .addCase(fetchPartidas.fulfilled, (state, action: PayloadAction<ConfrontosData>) => {
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