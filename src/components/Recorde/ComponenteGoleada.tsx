import React from 'react';
import { Goleada } from '@/store/types/recordes';
import Grid from "@mui/material/Grid";
import YouTubeIcon from "@mui/icons-material/YouTube";

interface ComponenteGoleadaProps {
  goleadas: Goleada[];
}

const ComponenteGoleada: React.FC<ComponenteGoleadaProps> = ({ goleadas }) => {

  return (
    <div className='recordes__goleadas'>
      {goleadas.length === 0 ? (
        null
      ) : (
        <>
            <Grid container spacing={4}>
                {goleadas.map((goleada, index) => {
                    const youtubeSearchQuery = `https://www.youtube.com/results?search_query=campeonato+brasileiro+${goleada.year}+${new Date(goleada.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}}+rodada+${goleada.rodada}+${goleada.homeTeam}+${goleada.homeGoals}x${goleada.awayGoals}+${goleada.awayTeam}`;

                    return (
                        <Grid size={{ xs: 12, sm: 6 }} key={index}>
                            <div className='recordes__goleadas__jogo'>
                                <h3 className='recordes__goleadas__jogo__data'>{new Date(goleada.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</h3>
                                <h4 className='recordes__goledas__jogo__campeonato'>{goleada.year} | Rodada {goleada.rodada}</h4>
                                <Grid container spacing={1}>
                                    <Grid size={{ xs: 4, sm: 4 }}>
                                        <img className='recordes__goleadas__jogo__img' src={`/times/${goleada.homeTeam}.png`} alt="" />
                                    </Grid>
                                    <Grid size={{ xs: 4, sm: 4 }}>
                                        <h5 className='recordes__goleadas__jogo__placar'>{goleada.homeGoals} x {goleada.awayGoals}</h5>
                                    </Grid>
                                    <Grid size={{ xs: 4, sm: 4 }}>
                                        <img className='recordes__goleadas__jogo__img' src={`/times/${goleada.awayTeam}.png`} alt="" />
                                    </Grid>
                                </Grid>
                                <a href={youtubeSearchQuery} target="_blank" rel="noopener noreferrer">
                                  <YouTubeIcon className="recordes__goleadas__jogo__youtube" />
                                </a>

                            </div>
                        </Grid>
                    )
                }
                    
                )}
            </Grid>
        </>
      )}
    </div>
  );
};

export default ComponenteGoleada;