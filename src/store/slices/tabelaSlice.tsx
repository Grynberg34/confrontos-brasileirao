import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Tabela } from '../types/tabela';

const initialState: Tabela = {
  tabela: [],
  jogosDaRodada: [],
  ano: 2025,
  rodada: 1,
  loading: false,
  error: null,
  temRodadaSeguinte: false
};

export const fetchTabela = createAsyncThunk(
  'tabela/fetchTabela',
  async ({ rodada, ano }: { rodada: number; ano: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}tabela`, { rodada, ano });
      if (!response.data || !response.data.tabela || !response.data.jogosDaRodada) {
        throw new Error('Dados inválidos recebidos da API');
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const tabelaSlice = createSlice({
  name: 'tabela',
  initialState,
  reducers: {
    setAno: (state, action) => {
      state.ano = action.payload;
    },
    setRodada: (state, action) => {
      state.rodada = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTabela.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTabela.fulfilled, (state, action) => {
        state.loading = false;
        state.tabela = action.payload.tabela;
        state.jogosDaRodada = action.payload.jogosDaRodada;
        state.ano = action.payload.ano;
        state.rodada = action.payload.rodada;
        state.temRodadaSeguinte = action.payload.temRodadaSeguinte;
      })
      .addCase(fetchTabela.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setAno, setRodada } = tabelaSlice.actions;
export default tabelaSlice.reducer;