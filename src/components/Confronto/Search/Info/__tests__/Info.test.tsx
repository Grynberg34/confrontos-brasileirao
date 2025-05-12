import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Info from '../Info';
import InfoStats from '../InfoStats';
import { PartidasState } from '@/store/types/partidas';
import { Store } from "redux";

describe('Info and InfoStats Components', () => {
  let mockState: { partidas: PartidasState };
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockState = {
      partidas: {
        data: null,
        loading: false,
        error: null,
      },
    };

    mockDispatch = jest.fn();
  });

  const renderWithProvider = (component: React.ReactNode, state: { partidas: PartidasState }) => {
    const mockStore = {
      getState: () => state,
      subscribe: jest.fn(),
      dispatch: mockDispatch,
    };

    return render(<Provider store={mockStore as unknown as Store}>{component}</Provider>);
  };

  describe('Info Component', () => {

    it('renders team information when partidas.data is populated', () => {
      mockState.partidas.data = {
        timeX: { nome: 'TeamX', pontos: 21, vitorias: 2, gols: 3, ultimasVitorias: 24, homeStats: { vitorias: 5, empates: 6, vitoriasY: 7 } },
        timeY: { nome: 'TeamY', pontos: 28, vitorias: 9, gols: 10, ultimasVitorias: 11, homeStats: { vitorias: 12, empates: 13, vitoriasX: 14 } },
        empates: 15,
        ultimosEmpates: 16,
        confrontos: [
          {
            id: 1,
            data: '2023-05-01',
            rodada: 20,
            ano: 2023,
            time_mandante: 'TeamX',
            time_visitante: 'TeamY',
            gols_mandante: 17,
            gols_visitante: 18,
            resultado: 'TeamX',
            tecnico_mandante: 'CoachX',
            tecnico_visitante: 'CoachY',
            gols_jogadores_mandante: 'Player1, Player2',
            gols_jogadores_visitante: 'Player3',
          },
        ],
      };

      renderWithProvider(<Info />, mockState);

      expect(screen.getByText('TeamX')).toBeInTheDocument();
      expect(screen.getByText('TeamY')).toBeInTheDocument();
    });
  });

  describe('InfoStats Component', () => {
    it('renders an empty <div> when partidas.data is null', () => {
      renderWithProvider(<InfoStats />, mockState);

      expect(screen.queryAllByText('').length).toBeGreaterThan(0);
    });

    it('renders stats for timeX as the home team', () => {
        mockState.partidas.data = {
            timeX: { nome: 'TeamX', pontos: 1, vitorias: 2, gols: 3, ultimasVitorias: 4, homeStats: { vitorias: 5, empates: 6, vitoriasY: 7 } },
            timeY: { nome: 'TeamY', pontos: 8, vitorias: 9, gols: 10, ultimasVitorias: 11, homeStats: { vitorias: 12, empates: 13, vitoriasX: 14 } },
            empates: 15,
            ultimosEmpates: 16,
            confrontos: [
              {
                id: 1,
                data: '2023-05-01',
                rodada: 1,
                ano: 2023,
                time_mandante: 'TeamX',
                time_visitante: 'TeamY',
                gols_mandante: 17,
                gols_visitante: 18,
                resultado: 'TeamX',
                tecnico_mandante: 'CoachX',
                tecnico_visitante: 'CoachY',
                gols_jogadores_mandante: 'Player1, Player2',
                gols_jogadores_visitante: 'Player3',
              },
            ],
        }

      renderWithProvider(<InfoStats />, mockState);

      expect(screen.getByText('TeamX mandante')).toBeInTheDocument();
      expect(screen.getByText('TeamY mandante')).toBeInTheDocument();
    });
  });
});