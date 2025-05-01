"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FilterButtons from "./FilterButtons";
import OrderButtons from "./OrderButtons";

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
      <FilterButtons
        filter={filter}
        setFilter={setFilter}
        times={{
          timeX: times.timeX ?? "",
          timeY: times.timeY ?? "",
        }}
      />
      <OrderButtons order={order} setOrder={setOrder} />

      <Grid container spacing={4}>
        {filteredConfrontos.map((partida, index) => {
          const youtubeSearchQuery = `https://www.youtube.com/results?search_query=campeonato+brasileiro+${partida.ano}+${new Date(partida.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })}}+rodada+${partida.rodada}+${partida.time_mandante}+${partida.gols_mandante}x${partida.gols_visitante}+${partida.time_visitante}`;

          return (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <div className={`partidas__item ${partida.resultado}`}>
                <div className="partidas__item__header">
                  <h4 className="partidas__item__header__rodada">
                    {partida.ano} - Rodada {partida.rodada}
                  </h4>
                  <h3 className="partidas__item__header__date">
                    {new Date(partida.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
                  </h3>
                </div>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 4, sm: 4 }} className="partidas__item__team">
                    <img
                      className="partidas__item__team__img"
                      src={`/times/${partida.time_mandante}.png`}
                      alt={partida.time_mandante}
                    />
                    {partida.tecnico_mandante && (
                      <div className="partidas__item__team__info">
                        <h1 className="partidas__item__team__info__title">TÉCNICO</h1>
                        <h1 className="partidas__item__team__info__text">{partida.tecnico_mandante}</h1>
                      </div>
                    )}
                    {partida.gols_jogadores_mandante && (
                      <div className="partidas__item__team__info">
                        <h1 className="partidas__item__team__info__title">GOLS</h1>
                        <h2 className="partidas__item__team__info__text">{partida.gols_jogadores_mandante}</h2>
                      </div>
                    )}
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
                    {partida.tecnico_visitante && (
                      <div className="partidas__item__team__info">
                        <h1 className="partidas__item__team__info__title">TÉCNICO</h1>
                        <h1 className="partidas__item__team__info__text">{partida.tecnico_visitante}</h1>
                      </div>
                    )}
                    {partida.gols_jogadores_visitante && (
                      <div className="partidas__item__team__info">
                        <h1 className="partidas__item__team__info__title">GOLS</h1>
                        <h2 className="partidas__item__team__info__text">{partida.gols_jogadores_visitante}</h2>
                      </div>
                    )}
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