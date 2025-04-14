"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Partidas = () => {
  const partidas = useSelector((state: RootState) => state.partidas);
  const times = useSelector((state: RootState) => state.times);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [filter, setFilter] = useState<"all" | "timeXHome" | "timeYHome">("all");

  if (partidas.data === null) {
    return <div></div>;
  }

  const sortedConfrontos = [...partidas.data.confrontos].sort((a, b) => {
    const dateA = new Date(a.data).getTime();
    const dateB = new Date(b.data).getTime();
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });

  const filteredConfrontos = sortedConfrontos.filter((partida) => {
    if (filter === "timeXHome") return partida.time_mandante === times.timeX;
    if (filter === "timeYHome") return partida.time_mandante === times.timeY;
    return true;
  });

  return (
    <div className="partidas">

      <div className="partidas__filter">
        <h1 className="partidas__filter__text">filtrar:</h1>
        <button
          className={`partidas__filter__button ${filter === "all" ? "selected" : ""}`}
          onClick={() => setFilter("all")}
        >
          Todos
        </button>
        <button
          className={`partidas__filter__button ${filter === "timeXHome" ? "selected" : ""}`}
          onClick={() => setFilter("timeXHome")}
        >
          {times.timeX} mandante
        </button>
        <button
          className={`partidas__filter__button ${filter === "timeYHome" ? "selected" : ""}`}
          onClick={() => setFilter("timeYHome")}
        >
          {times.timeY} mandante
        </button>
      </div>

      <div className="partidas__order">
        <h1 className="partidas__order__text">ordenar:</h1>
        <button
          className={`partidas__order__button ${order === "desc" ? "selected" : ""}`}
          onClick={() => setOrder("desc")}
        >
          2025-2003
        </button>
        <button
          className={`partidas__order__button ${order === "asc" ? "selected" : ""}`}
          onClick={() => setOrder("asc")}
        >
          2003-2025
        </button>
      </div>

      <Grid container spacing={4}>
        {filteredConfrontos.map((partida, index) => {
          const youtubeSearchQuery = `https://www.youtube.com/results?search_query=campeonato+brasileiro+${partida.ano}+${new Date(partida.data).toLocaleDateString()}+rodada+${partida.rodada}+${partida.time_mandante}+${partida.gols_mandante}x${partida.gols_visitante}+${partida.time_visitante}`;

          return (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <div className={`partidas__item ${partida.resultado}`}>
                <div className="partidas__item__header">
                  <h4 className="partidas__item__header__rodada">
                    {partida.ano} - Rodada {partida.rodada}
                  </h4>
                  <h3 className="partidas__item__header__date">
                    {new Date(partida.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                  </h3>
                </div>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 4, sm: 4 }} className="partidas__item__team">
                    <img
                      className="partidas__item__team__img"
                      src={`/times/${partida.time_mandante}.png`}
                      alt={partida.time_mandante}
                    />
                  </Grid>

                  <Grid size={{ xs: 4, sm: 4 }} className="partidas__item__score">
                    <h2 className="partidas__item__score__value">
                      {partida.gols_mandante} x {partida.gols_visitante}
                    </h2>
                  </Grid>

                  <Grid size={{ xs: 4, sm: 4 }} className="partidas__item__team">
                    <img
                      className="partidas__item__team__img"
                      src={`/times/${partida.time_visitante}.png`}
                      alt={partida.time_visitante}
                    />
                  </Grid>
                </Grid>

                <a href={youtubeSearchQuery} target="_blank" rel="noopener noreferrer">
                  <YouTubeIcon className="partidas__item__youtube" />
                </a>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Partidas;