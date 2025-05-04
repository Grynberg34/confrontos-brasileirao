import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {  CampanhasState } from '@/store/types/campanhas';


const initialState: CampanhasState = {
  campanhas: [],
  loading: false,
  error: null,
};

export const fetchCampanhas = createAsyncThunk(
  'campanhas/fetchCampanhas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}campanhas`);
      if (!response.data) {
        throw new Error('Dados inválidos recebidos da API');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const campanhasSlice = createSlice({
  name: 'campanhas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampanhas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampanhas.fulfilled, (state, action) => {
        state.loading = false;
        state.campanhas = action.payload;
      })
      .addCase(fetchCampanhas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default campanhasSlice.reducer;