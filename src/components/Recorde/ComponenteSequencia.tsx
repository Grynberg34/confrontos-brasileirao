import React from 'react';
import { Sequencia } from '@/store/types/recordes';
import Grid from "@mui/material/Grid";
import YouTubeIcon from "@mui/icons-material/YouTube";

interface ComponenteSequenciaProps {
  title: string;
  streaks: Sequencia[];
}

const ComponenteSequencia: React.FC<ComponenteSequenciaProps> = ({ title, streaks }) => {
  return (
    <div className='recordes__sequencias'>
      <h2 className='recordes__sequencias__title'>{title}</h2>
      {streaks.length === 0 ? (
        null
      ) : (
        <>
          {streaks.map((streak, index) => (
            <div className='recordes__sequencias__sequencia' key={index}>
              <h4 className='recordes__sequencias__sequencia__numero'>{streak.streak} jogos</h4>
              <h3 className='recordes__sequencias__sequencia__time'>{streak.team} {streak.season}</h3>
              <img className='recordes__sequencias__sequencia__img' src={`/times/${streak.team}.png`} alt="" />
              <Grid container spacing={2}>
                {streak.matches.map((match, matchIndex) => {
                  const youtubeSearchQuery = `https://www.youtube.com/results?search_query=campeonato+brasileiro+${streak.season}+${new Date(match.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}}+rodada+${match.rodada}+${match.homeTeam}+${match.homeGoals}x${match.awayGoals}+${match.awayTeam}`;
                  return (
                    <Grid size={{ xs: 12, sm: 6 }} key={matchIndex}>
                      <div className='recordes__sequencias__sequencia__jogo'>
                        <Grid container spacing={{ xs: 1, sm: 2 }}>
                          <Grid size={{ xs: 4, sm: 4 }}>
                            <h5 className='recordes__sequencias__sequencia__jogo__rodada'>Rodada {match.rodada}</h5>
                          </Grid>
                          <Grid size={{ xs: 2, sm: 2 }}>
                            <img className='recordes__sequencias__sequencia__jogo__img' src={`/times/${match.homeTeam}.png`} alt="" />
                          </Grid>
                          <Grid size={{ xs: 2, sm: 2 }}>
                            <h6 className='recordes__sequencias__sequencia__jogo__placar'>{match.homeGoals} x {match.awayGoals}</h6>
                          </Grid>
                          <Grid size={{ xs: 2, sm: 2 }}>
                            <img className='recordes__sequencias__sequencia__jogo__img' src={`/times/${match.awayTeam}.png`} alt="" />
                          </Grid>
                          <Grid size={{ xs: 2, sm: 2 }}>
                            <a href={youtubeSearchQuery} target="_blank" rel="noopener noreferrer">
                              <YouTubeIcon className="recordes__sequencias__sequencia__jogo__youtube" />
                            </a>
                          </Grid>
                        </Grid>
                      </div>

                    </Grid>
                  )
                })}
              </Grid>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ComponenteSequencia;