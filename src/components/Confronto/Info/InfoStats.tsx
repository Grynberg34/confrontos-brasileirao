"use client";

import React from "react";
import Grid from '@mui/material/Grid';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Info = () => {
  const partidas = useSelector((state: RootState) => state.partidas);

  if (partidas.data === null) {
    return <div></div>;
  }

  return (

    <div className="info__stats">

      {
        partidas.data.confrontos.length > 4 &&
        <div className="info__stats__section">
          <h1 className="info__stats__section__title">Últimos 5 jogos</h1>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 3 }}></Grid>

            <Grid size={{ xs: 4, sm: 2 }}>
              <h3 className="info__stats__section__subtitle">{partidas.data.timeX.ultimasVitorias} <span className="info__stats__section__subtitle--span">vitórias</span></h3>
            </Grid>

            <Grid size={{ xs: 4, sm: 2 }}>
            <h3 className="info__stats__section__subtitle">{partidas.data.ultimosEmpates} <span className="info__stats__section__subtitle--span">empates</span></h3>
            </Grid>

            <Grid size={{ xs: 4, sm: 2 }}>
            <h3 className="info__stats__section__subtitle">{partidas.data.timeY.ultimasVitorias} <span className="info__stats__section__subtitle--span">vitórias</span></h3>
            </Grid>
          </Grid>
        </div>
      }

      <div className="info__stats__section">
        <h1 className="info__stats__section__title">{partidas.data.timeX.nome} mandante</h1>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 3 }}></Grid>

          <Grid size={{ xs: 4, sm: 2 }}>
            <h3 className="info__stats__section__subtitle">{partidas.data.timeX.homeStats.vitorias} <span className="info__stats__section__subtitle--span">vitórias</span></h3>
          </Grid>

          <Grid size={{ xs: 4, sm: 2 }}>
          <h3 className="info__stats__section__subtitle">{partidas.data.timeX.homeStats.empates} <span className="info__stats__section__subtitle--span">empates</span></h3>
          </Grid>

          <Grid size={{ xs: 4, sm: 2 }}>
          <h3 className="info__stats__section__subtitle">{partidas.data.timeX.homeStats.vitoriasY} <span className="info__stats__section__subtitle--span">vitórias</span></h3>
          </Grid>
        </Grid>
      </div>

      <div className="info__stats__section">
        <h1 className="info__stats__section__title">{partidas.data.timeY.nome} mandante</h1>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 3 }}></Grid>

          <Grid size={{ xs: 4, sm: 2 }}>
            <h3 className="info__stats__section__subtitle">{partidas.data.timeY.homeStats.vitoriasX} <span className="info__stats__section__subtitle--span">vitórias</span></h3>
          </Grid>

          <Grid size={{ xs: 4, sm: 2 }}>
          <h3 className="info__stats__section__subtitle">{partidas.data.timeY.homeStats.empates} <span className="info__stats__section__subtitle--span">empates</span></h3>
          </Grid>

          <Grid size={{ xs: 4, sm: 2 }}>
          <h3 className="info__stats__section__subtitle">{partidas.data.timeY.homeStats.vitorias} <span className="info__stats__section__subtitle--span">vitórias</span></h3>
          </Grid>
        </Grid>
      </div>

    </div>

  );
};

export default Info;