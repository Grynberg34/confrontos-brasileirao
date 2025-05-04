import React from 'react';
import { Performance } from '@/store/types/recordes';

interface ComponentePerformancePróps {
  title: string;
  performance: Performance | undefined;
}

const ComponentePerformance: React.FC<ComponentePerformancePróps> = ({ title, performance }) => {

  return (
    <div className='recordes__performance'>
      <h2 className='recordes__performance__title'>{title}</h2>
      {performance ? (
          <>
            <img className='recordes__performance__img' src={`/times/${performance.team}.png`} alt="" /> 
            <h3 className='recordes__performance__time'>
              {performance.team}
              <span className='recordes__performance__ano'>{performance.season}</span>
            </h3>
            <ul className='recordes__performance__dados'>
              <li className='recordes__performance__dados__item' >Aproveitamento: {performance.aproveitamento}%</li>
              <li className='recordes__performance__dados__item' >Pontos: {performance.pontos}</li>
              <li className='recordes__performance__dados__item' >Jogos: {performance.jogos}</li>
              <li className='recordes__performance__dados__item' >Vitórias: {performance.vitorias}</li>
              <li className='recordes__performance__dados__item' >Empates: {performance.draws}</li>
              <li className='recordes__performance__dados__item' >Derrotas: {performance.losses}</li>
              <li className='recordes__performance__dados__item' >Gols Pró: {performance.golsPro}</li>
              <li className='recordes__performance__dados__item' >Gols Contra: {performance.golsContra}</li>
              <li className='recordes__performance__dados__item' >Saldo de Gols: {performance.saldoGols}</li>
            </ul>
          </>
      ) : (
        null
      )}
    </div>
  );
};

export default ComponentePerformance;