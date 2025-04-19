"use client";

import React from "react";
import Grid from '@mui/material/Grid';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import InfoStats from '@/components/Confronto/Info/InfoStats';

const Info = () => {
  const partidas = useSelector((state: RootState) => state.partidas);

  if (partidas.data === null) {
    return <div></div>;
  } 

  return (
    <div className="info">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <div className="info__time">
            <h1 className="info__time__name">{partidas.data.timeX.nome}</h1>
            <img className="info__time__img" src={`/times/${partidas.data.timeX.nome}.png`} alt={partidas.data.timeX.nome || "default"} />
          </div>
        </Grid>

        <Grid size={{ xs: 4, sm: 2 }}>
            <div className="info__section">
              <img className="info__section__img" src={`/times/${partidas.data.timeX.nome}.png`} alt={partidas.data.timeX.nome || "default"} />
              <h1 className="info__section__points">{partidas.data.timeX.pontos}</h1>
              <h2 className="info__section__title">pontos</h2>
            </div>

            <h3 className="info__subtitle">{partidas.data.timeX.vitorias} <span className="info__subtitle--span">vitórias</span></h3>
            <h3 className="info__subtitle">{partidas.data.timeX.gols} <span className="info__subtitle--span">gols</span></h3>
        </Grid>

        <Grid size={{ xs: 4, sm: 2 }}>
          <h1 className="info__versus">X</h1>
          <h2 className="info__subtitle">{partidas.data.empates} <span className="info__subtitle--span">empates</span></h2>
          <h2 className="info__subtitle">{partidas.data.confrontos.length} <span className="info__subtitle--span">jogos</span></h2>
        </Grid>

        <Grid size={{ xs: 4, sm: 2 }}>
            <div className="info__section">
              <img className="info__section__img" src={`/times/${partidas.data.timeY.nome}.png`} alt={partidas.data.timeY.nome || "default"} />
              <h1 className="info__section__points">{partidas.data.timeY.pontos}</h1>
              <h2 className="info__section__title">pontos</h2>
            </div>

            <h3 className="info__subtitle">{partidas.data.timeY.vitorias} <span className="info__subtitle--span">vitórias</span></h3>
            <h3 className="info__subtitle">{partidas.data.timeY.gols} <span className="info__subtitle--span">gols</span></h3>

        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <div className="info__time">
            <h1 className="info__time__name">{partidas.data.timeY.nome}</h1>
            <img className="info__time__img" src={`/times/${partidas.data.timeY.nome}.png`} alt={partidas.data.timeY.nome || "default"} />
          </div>
        </Grid>
      </Grid>

      <InfoStats />


    </div>
  );
};

export default Info;