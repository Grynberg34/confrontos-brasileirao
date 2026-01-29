"use client";

import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setAno, setRodada, fetchTabela } from '@/store/slices/tabelaSlice';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Grid from "@mui/material/Grid";
import debounce from 'lodash/debounce';

const TabelaHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ano, rodada, temRodadaSeguinte } = useSelector((state: RootState) => state.tabela);

  const debouncedFetchTabela = useCallback(
    debounce((params: { rodada: number; ano: number; }) => dispatch(fetchTabela(params)), 300),
    [dispatch]
  );

  const handleNextAno = () => {
    const newAno = ano + 1;
    dispatch(setAno(newAno));
    debouncedFetchTabela({ rodada, ano: newAno });
  };

  const handlePreviousAno = () => {
    const newAno = ano - 1;
    dispatch(setAno(newAno));
    debouncedFetchTabela({ rodada, ano: newAno });
  };

  const handleNextRodada = () => {
    const newRodada = rodada + 1;
    dispatch(setRodada(newRodada));
    debouncedFetchTabela({ rodada: newRodada, ano });
  };

  const handlePreviousRodada = () => {
    const newRodada = rodada - 1;
    dispatch(setRodada(newRodada));
    debouncedFetchTabela({ rodada: newRodada, ano });
  };

  return (
    <div className="tabela__header"  data-testid="tabela-header">
        <div className='tabela__header__ano'>
            <Grid container spacing={2}>
                <Grid size={{ xs: 3, sm: 4 }}>
                    {ano > 2003 && (
                        <ArrowCircleLeftIcon className='tabela__header__ano__arrow' onClick={handlePreviousAno} aria-label="previous year"   />
                    )}
                </Grid>

                <Grid size={{ xs: 6, sm: 4 }}>
                    <h1 className='tabela__header__ano__title'>{ano}</h1>
                </Grid>

                <Grid size={{ xs: 3, sm: 4 }}>
                    {ano < 2026 && (
                        <ArrowCircleRightIcon className='tabela__header__ano__arrow' onClick={handleNextAno} aria-label="next year"  />
                    )}
                </Grid>
            </Grid>
        </div>
        <div className="tabela__header__rodada">
            <Grid container spacing={2}>
                <Grid size={{ xs: 3, sm: 4 }}>
                    {rodada > 1 && (
                        <ArrowCircleLeftIcon className='tabela__header__rodada__arrow' onClick={handlePreviousRodada}  aria-label="previous rodada" />
                    )}
                </Grid>

                <Grid size={{ xs: 6, sm: 4 }}>  
                    <h2 className='tabela__header__rodada__title'>Rodada {rodada}</h2>
                </Grid>

                <Grid size={{ xs: 3, sm: 4 }}>
                    {temRodadaSeguinte && (
                        <ArrowCircleRightIcon className='tabela__header__rodada__arrow' onClick={handleNextRodada} aria-label="next rodada" />
                    )}
                </Grid>
            </Grid>
        </div>
    </div>
  );
};

export default TabelaHeader;