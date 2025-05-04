"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStreaks, fetchPerformances } from '@/store/slices/recordesSlice';
import { AppDispatch, RootState } from '@/store/store';
import Header from "@/components/Header/Header";
import ComponenteSequencia from "@/components/Recorde/ComponenteSequencia";
import ComponentePerformance from "@/components/Recorde/ComponentePerformance";
import ComponenteGoleada from "@/components/Recorde/ComponenteGoleada";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const RecordesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    winStreaks,
    unbeatenStreaks,
    lossStreaks,
    drawStreaks,
    homeWinStreaks,
    awayWinStreaks,
    bestFirstHalf,
    bestSecondHalf,
    bestHomeSeason,
    bestAwaySeason,
    goleadas,
    loading,
  } = useSelector((state: RootState) => state.recordes);

  useEffect(() => {
    dispatch(fetchStreaks());
    dispatch(fetchPerformances());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="recordes">
        <Header alternate={true} />
        <div className="recordes__loading">
          <CircularProgress
            className="recordes__loading__icon"
            color="inherit"
          />
        </div>
      </div>
    );
  }

  return (
    <div className='recordes'>
      <Header alternate={true} />
      <h1 className='recordes__title'>Recordes coletivos</h1>


      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ComponentePerformance title="Melhor turno" performance={bestFirstHalf} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ComponentePerformance title="Melhor returno" performance={bestSecondHalf} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ComponentePerformance title="Melhor mandante" performance={bestHomeSeason} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ComponentePerformance title="Melhor visitante" performance={bestAwaySeason} />
        </Grid>
      </Grid>

      <h2 className='recordes__title'>Maiores goleadas</h2>

      <ComponenteGoleada goleadas={goleadas} />

      <h2 className='recordes__title'>Maiores sequências em uma edição</h2>

      <ComponenteSequencia title="Sequência de vitórias" streaks={winStreaks} />
      <ComponenteSequencia title="Sequência invicta" streaks={unbeatenStreaks} />
      <ComponenteSequencia title="Sequência de empates" streaks={drawStreaks} />
      <ComponenteSequencia title="Sequência de derrotas" streaks={lossStreaks} />
      <ComponenteSequencia title="Sequência de vitórias como mandante" streaks={homeWinStreaks} />
      <ComponenteSequencia title="Sequência de vitórias como visitante" streaks={awayWinStreaks} />
    </div>
  );
};

export default RecordesPage;