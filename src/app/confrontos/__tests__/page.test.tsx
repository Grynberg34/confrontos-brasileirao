import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ConfrontosPage from "../page";
import { PartidasState } from "@/store/types/partidas";
import { TimesState } from "@/store/types/times";
import { Store } from "redux";

describe("ConfrontosPage", () => {
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
        list: ["Team A", "Team B", "Team C"],
        timeX: null,
        timeY: null,
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

  it("renders ConfrontoHome when partidas.data is null", () => {
    renderWithProvider(<ConfrontosPage />, mockState);

    const confrontoHome = screen.getByTestId("confronto-home");
    expect(confrontoHome).toBeInTheDocument();
  });

  it("renders ConfrontoSearch when partidas.data is not null", () => {
    mockState.partidas.data = {
      confrontos: [
        {
          id: 1,
          data: "2023-05-01",
          rodada: 1,
          ano: 2023,
          time_mandante: "Team A",
          time_visitante: "Team B",
          gols_mandante: 2,
          gols_visitante: 1,
          resultado: "2 x 1",
          tecnico_mandante: "Coach A",
          tecnico_visitante: "Coach B",
          gols_jogadores_mandante: null,
          gols_jogadores_visitante: null,
        },
      ],
      empates: 0,
      ultimosEmpates: 0,
      timeX: {
        nome: "Team A",
        vitorias: 10,
        gols: 25,
        pontos: 30,
        ultimasVitorias: 3,
        homeStats: {
          vitorias: 5,
          empates: 2,
        },
      },
      timeY: {
        nome: "Team B",
        vitorias: 8,
        gols: 20,
        pontos: 24,
        ultimasVitorias: 2,
        homeStats: {
          vitorias: 4,
          empates: 1,
        },
      },
    };

    renderWithProvider(<ConfrontosPage />, mockState);

    const confrontoSearch = screen.getByTestId("confronto-search");
    expect(confrontoSearch).toBeInTheDocument();
  });

  it("does not render ConfrontoSearch when partidas.data is null", () => {
    renderWithProvider(<ConfrontosPage />, mockState);

    expect(screen.queryByTestId("confronto-search")).not.toBeInTheDocument();
  });

  it("does not render ConfrontoHome when partidas.data is not null", () => {
    mockState.partidas.data = {
      confrontos: [
        {
          id: 1,
          data: "2023-05-01",
          rodada: 1,
          ano: 2023,
          time_mandante: "Team A",
          time_visitante: "Team B",
          gols_mandante: 2,
          gols_visitante: 1,
          resultado: "2 x 1",
          tecnico_mandante: "Coach A",
          tecnico_visitante: "Coach B",
          gols_jogadores_mandante: null,
          gols_jogadores_visitante: null,
        },
      ],
      empates: 0,
      ultimosEmpates: 0,
      timeX: {
        nome: "Team A",
        vitorias: 10,
        gols: 25,
        pontos: 30,
        ultimasVitorias: 3,
        homeStats: {
          vitorias: 5,
          empates: 2,
        },
      },
      timeY: {
        nome: "Team B",
        vitorias: 8,
        gols: 20,
        pontos: 24,
        ultimasVitorias: 2,
        homeStats: {
          vitorias: 4,
          empates: 1,
        },
      },
    };

    renderWithProvider(<ConfrontosPage />, mockState);

    expect(screen.queryByTestId("confronto-home")).not.toBeInTheDocument();
  });
});