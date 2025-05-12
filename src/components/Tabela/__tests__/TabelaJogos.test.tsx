import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import TabelaJogos from "../TabelaJogos";
import { Tabela } from "@/store/types/tabela";
import { Store } from "redux";

describe("TabelaJogos", () => {
  let mockState: { tabela: Tabela };

  beforeEach(() => {
    mockState = {
      tabela: {
        tabela: [],
        jogosDaRodada: [
          {
            mandante: "Team A",
            visitante: "Team B",
            golsMandante: 2,
            golsVisitante: 1,
            data: "2023-05-01T00:00:00Z",
          },
        ],
        ano: 2025,
        rodada: 1,
        loading: false,
        error: null,
        temRodadaSeguinte: true,
      },
    };
  });

  const renderWithProvider = (component: React.ReactNode, state: typeof mockState) => {
    const mockStore = {
      getState: () => state,
      subscribe: jest.fn(),
      dispatch: jest.fn(),
    };

    return render(<Provider store={mockStore as unknown as Store}>{component}</Provider>);
  };

  it("renders the title with the current rodada", () => {
    renderWithProvider(<TabelaJogos />, mockState);

    expect(screen.getByText("Jogos da rodada 1")).toBeInTheDocument();
  });

  it("renders the games for the current rodada", () => {
    renderWithProvider(<TabelaJogos />, mockState);

    expect(screen.getByText("2 x 1")).toBeInTheDocument();

    expect(screen.getByAltText("time1")).toHaveAttribute("src", "/times/Team A.png");
    expect(screen.getByAltText("time2")).toHaveAttribute("src", "/times/Team B.png");
  });

  it("renders an empty state when there are no games", () => {
    mockState.tabela.jogosDaRodada = [];

    renderWithProvider(<TabelaJogos />, mockState);

    expect(screen.queryByText("2 x 1")).not.toBeInTheDocument();
    expect(screen.queryByText("0 x 0")).not.toBeInTheDocument();
  });
});