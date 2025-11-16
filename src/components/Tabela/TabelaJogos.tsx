"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Grid from '@mui/material/Grid';
import YouTubeIcon from "@mui/icons-material/YouTube";

  function formatDate(dateString : string): string {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }


const TabelaJogos: React.FC = () => {
  const { jogosDaRodada, rodada, ano } = useSelector((state: RootState) => state.tabela);

  console.log('Jogos da Rodada:', jogosDaRodada);


  return (
    <div className="tabela__jogos" data-testid="tabela-jogos">
      <h1 className='tabela__jogos__title'>Jogos da rodada {rodada}</h1>
      <Grid container spacing={{xs: 1, sm: 2}}>
        {jogosDaRodada.map((jogo, index) => {
          const youtubeSearchQuery = `https://www.youtube.com/results?search_query=campeonato+brasileiro+${ano}+${new Date(jogo.data).toLocaleDateString("pt-BR", { timeZone: "UTC" })}+rodada+${rodada}+${jogo.mandante}+${jogo.golsMandante}x${jogo.golsVisitante}+${jogo.visitante}`;

          return (
            <Grid size={{ xs: 6, sm: 4 }} key={index}>
              <div className={`tabela__jogos__jogo ${index % 2 === 0 ? 'odd' : 'even'}`}>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 3, sm: 3 }}>
                    <img className='tabela__jogos__jogo__img' src={`/times/${jogo.mandante}.png`} alt="time1" />
                  </Grid>
                  <Grid size={{ xs: 6, sm: 6 }}>
                    <h1 className='tabela__jogos__jogo__placar'>{jogo.golsMandante} x {jogo.golsVisitante}</h1>
                    <h2 className='tabela__jogos__jogo__data'>{formatDate(jogo.data)}</h2>
                  </Grid>
                  <Grid size={{ xs: 3, sm: 3 }}>
                    <img className='tabela__jogos__jogo__img' src={`/times/${jogo.visitante}.png`} alt="time2" />
                  </Grid>
                </Grid>

                <a href={youtubeSearchQuery} target="_blank" rel="noopener noreferrer">
                  <YouTubeIcon className="tabela__jogos__jogo__youtube" />
                </a>

              </div>


            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default TabelaJogos;