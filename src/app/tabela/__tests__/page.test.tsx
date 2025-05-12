import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Tabela from "../page";
import { Tabela as TabelaState } from "@/store/types/tabela";
import { fetchTabela } from "@/store/slices/tabelaSlice";
import { Store } from "redux";

jest.mock("@/store/slices/tabelaSlice", () => ({
  fetchTabela: jest.fn(),
}));

describe("Tabela Page", () => {
  let mockState: { tabela: TabelaState };
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockState = {
      tabela: {
        tabela: [],
        jogosDaRodada: [],
        ano: 2025,
        rodada: 0,
        loading: false,
        error: null,
        temRodadaSeguinte: false,
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

  it("renders a loading spinner when loading is true", () => {
    mockState.tabela.loading = true;

    renderWithProvider(<Tabela />, mockState);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

it("renders TabelaHeader, TabelaClassificacao, and TabelaJogos when tabela has data", () => {
  mockState.tabela = {
    tabela: [
      {
        time: "TeamA",
        pontos: 10,
        golsPro: 15,
        golsContra: 5,
        saldo: 10,
        vitorias: 3,
        empates: 1,
        derrotas: 1,
      },
    ],
    jogosDaRodada: [
      {
        mandante: "TeamA",
        visitante: "TeamB",
        golsMandante: 2,
        golsVisitante: 1,
        data: "2023-05-01",
      },
    ],
    ano: 2025,
    rodada: 1, 
    loading: false,
    error: null,
    temRodadaSeguinte: true,
  };

  renderWithProvider(<Tabela />, mockState);

  const tabelaHeader = screen.getByTestId("tabela-header");
  expect(tabelaHeader).toBeInTheDocument();
  expect(tabelaHeader).toHaveTextContent("2025");
  expect(tabelaHeader).toHaveTextContent("Rodada 1");
  const tabelaClassificacao = screen.getByTestId("tabela-classificacao");
  expect(tabelaClassificacao).toBeInTheDocument();
  const tabelaJogos = screen.getByTestId("tabela-jogos");
  expect(tabelaJogos).toBeInTheDocument();

  expect(screen.getByText("TeamA")).toBeInTheDocument();

  expect(screen.getByText("2 x 1")).toBeInTheDocument();
});

  it("does not render TabelaHeader, TabelaClassificacao, and TabelaJogos when tabela is empty", () => {
    renderWithProvider(<Tabela />, mockState);

    expect(screen.queryByTestId("tabela-header")).not.toBeInTheDocument();
    expect(screen.queryByTestId("tabela-classificacao")).not.toBeInTheDocument();
    expect(screen.queryByTestId("tabela-jogos")).not.toBeInTheDocument();
  });

  it("dispatches fetchTabela on mount with the correct parameters", () => {
    renderWithProvider(<Tabela />, mockState);

    expect(mockDispatch).toHaveBeenCalledWith(fetchTabela({ rodada: 0, ano: 2025 }));
  });
});