"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { fetchTabela } from '@/store/slices/tabelaSlice';
import TabelaHeader from '@/components/Tabela/TabelaHeader';
import TabelaClassificacao from '@/components/Tabela/TabelaClassificacao';
import TabelaJogos from '@/components/Tabela/TabelaJogos';
import Header from '@/components/Header/Header';
import { RootState } from '@/store/store';
import CircularProgress from '@mui/material/CircularProgress';

const Tabela = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tabela, loading } = useSelector((state: RootState) => state.tabela);

  useEffect(() => {
    dispatch(fetchTabela({ rodada: 0, ano: 2025 }));
  }, [dispatch]);

  if (loading) return (
    <div className="tabela">
      <Header />
      <div className="tabela__loading">
        <CircularProgress className="tabela__loading__icon" size={20} color="inherit" />
      </div>
    </div>
  );


  return (
    <div className="tabela">

      <Header />
      {
        tabela.length > 1 && <div>
          <TabelaHeader />
    
          <TabelaClassificacao />
    
          <TabelaJogos />
        </div>
      }
    </div>
  );
};

export default Tabela;