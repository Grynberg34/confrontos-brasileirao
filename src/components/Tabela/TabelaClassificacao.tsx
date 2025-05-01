"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Grid from '@mui/material/Grid';

const TabelaClassificacao: React.FC = () => {
  const { tabela } = useSelector((state: RootState) => state.tabela);

  return (
    <div className="tabela__classificacao">
      <Grid container spacing={{xs: 1, sm: 2}} className="tabela__classificacao__header">
        <Grid size={{ xs: 1, sm: 1 }} />
        <Grid size={{ xs: 3, sm: 3 }}>
          <h1 className="tabela__classificacao__header__title center" >Time</h1>
        </Grid>
        <Grid size={{ xs: 1, sm: 1 }}>
          <h1 className="tabela__classificacao__header__title" >P</h1>
        </Grid>
        <Grid size={{ xs: 1, sm: 1 }}>
          <h1 className="tabela__classificacao__header__title" >J</h1>
        </Grid>
        <Grid size={{ xs: 1, sm: 1 }}>
          <h1 className="tabela__classificacao__header__title" >V</h1>
        </Grid>
        <Grid size={{ xs: 1, sm: 1 }}>
          <h1 className="tabela__classificacao__header__title" >E</h1>
        </Grid>
        <Grid size={{ xs: 1, sm: 1 }}>
          <h1 className="tabela__classificacao__header__title" >D</h1>
        </Grid>
        <Grid size={{ xs: 1, sm: 1 }}>
          <h1 className="tabela__classificacao__header__title" >GP</h1>
        </Grid>
        <Grid size={{ xs: 1, sm: 1 }}>
          <h1 className="tabela__classificacao__header__title" >GC</h1>
        </Grid>
        <Grid size={{ xs: 1, sm: 1 }}>
          <h1 className="tabela__classificacao__header__title" >S</h1>
        </Grid>
      </Grid>

      {tabela.map((time, index) => (
        <Grid container spacing={{xs: 1, sm: 2}} className="tabela__classificacao__rows" key={index}>
          <Grid size={{ xs: 1, sm: 1 }}>
          <h2 className="tabela__classificacao__rows__title center">{index+1}</h2>
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }}>
            <img className='tabela__classificacao__rows__img' src={`/times/${time.time}.png`} alt="" />
          </Grid>
          <Grid size={{ xs: 2, sm: 2 }}>
            <h2 className="tabela__classificacao__rows__title left">{time.time}</h2>
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }}>
            <h2 className="tabela__classificacao__rows__title points">{time.pontos}</h2>
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }}>
            <h1 className="tabela__classificacao__rows__title">{time.vitorias + time.empates + time.derrotas}</h1>
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }}>
            <h2 className="tabela__classificacao__rows__title">{time.vitorias}</h2>
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }}>
            <h2 className="tabela__classificacao__rows__title">{time.empates}</h2>
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }}>
            <h2 className="tabela__classificacao__rows__title">{time.derrotas}</h2>
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }}>
            <h2 className="tabela__classificacao__rows__title">{time.golsPro}</h2>
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }}>
            <h2 className="tabela__classificacao__rows__title">{time.golsContra}</h2>
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }}>
            <h2 className="tabela__classificacao__rows__title">{time.saldo}</h2>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default TabelaClassificacao;