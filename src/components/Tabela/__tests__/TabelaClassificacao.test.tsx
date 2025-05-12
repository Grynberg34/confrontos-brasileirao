import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import TabelaClassificacao from "../TabelaClassificacao";
import { Tabela } from "@/store/types/tabela";
import { Store } from "redux";

describe("TabelaClassificacao", () => {
  let mockState: { tabela: Tabela };

  beforeEach(() => {
    mockState = {
      tabela: {
        tabela: [
          {
            time: "Team A",
            pontos: 30,
            golsPro: 40,
            golsContra: 22,
            saldo: 20,
            vitorias: 11,
            empates: 0,
            derrotas: 7,
          },
          {
            time: "Team B",
            pontos: 27,
            golsPro: 35,
            golsContra: 25,
            saldo: 10,
            vitorias: 8,
            empates: 3,
            derrotas: 2,
          },
        ],
        jogosDaRodada: [],
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

  it("renders the classification table header", () => {
    renderWithProvider(<TabelaClassificacao />, mockState);

    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("P")).toBeInTheDocument();
    expect(screen.getByText("J")).toBeInTheDocument();
    expect(screen.getByText("V")).toBeInTheDocument();
    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
    expect(screen.getByText("GP")).toBeInTheDocument();
    expect(screen.getByText("GC")).toBeInTheDocument();
    expect(screen.getByText("S")).toBeInTheDocument();
  });

  it("renders the classification rows for each team", () => {
    renderWithProvider(<TabelaClassificacao />, mockState);

    expect(screen.getByText("Team A")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("40")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();

    expect(screen.getByText("Team B")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  it("renders the team logos", () => {
    renderWithProvider(<TabelaClassificacao />, mockState);

    const teamALogo = screen.getByAltText("0");
    expect(teamALogo).toHaveAttribute("src", "/times/Team A.png");

    const teamBLogo = screen.getByAltText("1");
    expect(teamBLogo).toHaveAttribute("src", "/times/Team B.png");
  });

  it("renders an empty table when there is no data", () => {
    mockState.tabela.tabela = [];

    renderWithProvider(<TabelaClassificacao />, mockState);

    expect(screen.queryByText("Team A")).not.toBeInTheDocument();
    expect(screen.queryByText("Team B")).not.toBeInTheDocument();
  });
});