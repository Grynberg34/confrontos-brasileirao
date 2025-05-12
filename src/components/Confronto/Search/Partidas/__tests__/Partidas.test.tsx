import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Partidas from '../Partidas';
import { PartidasState } from '@/store/types/partidas';
import { TimesState } from '@/store/types/times';
import { Store } from "redux";

describe('Partidas Component', () => {
  let mockState: { partidas: PartidasState; times: TimesState };
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockState = {
      partidas: {
        data: null,
        loading: false,
        error: null,
      },
      times: {
        list: [],
        timeX: 'TeamX',
        timeY: 'TeamY',
        loading: false,
        error: null,
      },
    };

    mockDispatch = jest.fn();
  });

  const renderWithProvider = (component: React.ReactNode, state: typeof mockState) => {
    const mockStore = {
      getState: () => state,
      subscribe: jest.fn(),
      dispatch: mockDispatch,
    };

    return render(<Provider store={mockStore as unknown as Store}>{component}</Provider>);
  };

  it('renders the list of matches when partidas.data is populated', () => {
    mockState.partidas.data = {
      confrontos: [
        {
          id: 1,
          data: '2023-05-01',
          rodada: 1,
          ano: 2023,
          time_mandante: 'TeamX',
          time_visitante: 'TeamY',
          gols_mandante: 2,
          gols_visitante: 1,
          resultado: 'TeamX',
          tecnico_mandante: 'CoachX',
          tecnico_visitante: 'CoachY',
          gols_jogadores_mandante: 'Player1, Player2',
          gols_jogadores_visitante: 'Player3',
        },
      ],
      empates: 0,
      ultimosEmpates: 0,
      timeX: { nome: 'TeamX', pontos: 10, vitorias: 5, gols: 15, ultimasVitorias: 3, homeStats: { vitorias: 5, empates: 2, vitoriasY: 3 } },
      timeY: { nome: 'TeamY', pontos: 8, vitorias: 3, gols: 10, ultimasVitorias: 2, homeStats: { vitorias: 6, empates: 3, vitoriasX: 4 } },
    };

    renderWithProvider(<Partidas />, mockState);

    expect(screen.getByText('2023 - Rodada 1')).toBeInTheDocument();
    expect(screen.getByText('2 x 1')).toBeInTheDocument();
  });

  it('filters matches by timeX as the home team', () => {
    mockState.partidas.data = {
      confrontos: [
        { id: 1, data: '2023-05-01', rodada: 1, ano: 2023, time_mandante: 'TeamX', time_visitante: 'TeamY', gols_mandante: 2, gols_visitante: 1, resultado: 'TeamX', tecnico_mandante: null, tecnico_visitante: null, gols_jogadores_mandante: null, gols_jogadores_visitante: null },
        { id: 2, data: '2023-05-02', rodada: 2, ano: 2023, time_mandante: 'TeamY', time_visitante: 'TeamX', gols_mandante: 1, gols_visitante: 2, resultado: 'TeamX', tecnico_mandante: null, tecnico_visitante: null, gols_jogadores_mandante: null, gols_jogadores_visitante: null },
      ],
      empates: 0,
      ultimosEmpates: 0,
      timeX: { nome: 'TeamX', pontos: 10, vitorias: 5, gols: 15, ultimasVitorias: 3, homeStats: { vitorias: 5, empates: 2, vitoriasY: 3 } },
      timeY: { nome: 'TeamY', pontos: 8, vitorias: 3, gols: 10, ultimasVitorias: 2, homeStats: { vitorias: 6, empates: 3, vitoriasX: 4 } },
    };

    renderWithProvider(<Partidas />, mockState);

    const timeXButton = screen.getByText('TeamX mandante');
    fireEvent.click(timeXButton);

    expect(screen.getByText('2023 - Rodada 1')).toBeInTheDocument();
    expect(screen.queryByText('2023 - Rodada 2')).not.toBeInTheDocument();
  });

  it('orders matches in ascending order', () => {
    mockState.partidas.data = {
      confrontos: [
        { id: 1, data: '2023-05-02', rodada: 2, ano: 2023, time_mandante: 'TeamX', time_visitante: 'TeamY', gols_mandante: 2, gols_visitante: 1, resultado: 'TeamX', tecnico_mandante: null, tecnico_visitante: null, gols_jogadores_mandante: null, gols_jogadores_visitante: null },
        { id: 2, data: '2023-05-01', rodada: 1, ano: 2023, time_mandante: 'TeamY', time_visitante: 'TeamX', gols_mandante: 1, gols_visitante: 2, resultado: 'TeamX', tecnico_mandante: null, tecnico_visitante: null, gols_jogadores_mandante: null, gols_jogadores_visitante: null },
      ],
      empates: 0,
      ultimosEmpates: 0,
      timeX: { nome: 'TeamX', pontos: 10, vitorias: 5, gols: 15, ultimasVitorias: 3, homeStats: { vitorias: 5, empates: 2, vitoriasY: 3 } },
      timeY: { nome: 'TeamY', pontos: 8, vitorias: 3, gols: 10, ultimasVitorias: 2, homeStats: { vitorias: 6, empates: 3, vitoriasX: 4 } },
    };

    renderWithProvider(<Partidas />, mockState);

    const ascButton = screen.getByText('2003-2025');
    fireEvent.click(ascButton);

    const matches = screen.getAllByText(/Rodada/);
    expect(matches[0]).toHaveTextContent('2023 - Rodada 1');
    expect(matches[1]).toHaveTextContent('2023 - Rodada 2');
  });
});