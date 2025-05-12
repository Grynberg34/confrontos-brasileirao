import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import TabelaHeader from "../TabelaHeader";
import { Tabela } from "@/store/types/tabela";
import { Store } from "redux";

describe("TabelaHeader", () => {
  let mockState: { tabela: Tabela };
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockState = {
      tabela: {
        tabela: [],
        jogosDaRodada: [],
        ano: 2025,
        rodada: 1,
        loading: false,
        error: null,
        temRodadaSeguinte: true,
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

  it("renders the current year and rodada", () => {
    renderWithProvider(<TabelaHeader />, mockState);

    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(screen.getByText("Rodada 1")).toBeInTheDocument();
  });

  it("renders the previous year arrow when the year is greater than 2003", () => {
    renderWithProvider(<TabelaHeader />, mockState);

    const previousYearArrow = screen.getByLabelText("previous year");
    expect(previousYearArrow).toBeInTheDocument();
  });

  it("does not render the previous year arrow when the year is 2003", () => {
    mockState.tabela.ano = 2003;

    renderWithProvider(<TabelaHeader />, mockState);

    expect(screen.queryByLabelText("previous year")).not.toBeInTheDocument();
  });

  it("renders the next year arrow when the year is less than 2025", () => {
    mockState.tabela.ano = 2024;

    renderWithProvider(<TabelaHeader />, mockState);

    const nextYearArrow = screen.getByLabelText("next year");
    expect(nextYearArrow).toBeInTheDocument();
  });

  it("does not render the next year arrow when the year is 2025", () => {
    mockState.tabela.ano = 2025;

    renderWithProvider(<TabelaHeader />, mockState);

    expect(screen.queryByLabelText("next year")).not.toBeInTheDocument();
  });

  it("dispatches the correct action when the next year arrow is clicked", () => {
    mockState.tabela.ano = 2024;

    renderWithProvider(<TabelaHeader />, mockState);

    const nextYearArrow = screen.getByLabelText("next year");
    fireEvent.click(nextYearArrow);

    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: "tabela/setAno", payload: 2025 });
  });

  it("dispatches the correct action when the previous year arrow is clicked", () => {
    mockState.tabela.ano = 2025;

    renderWithProvider(<TabelaHeader />, mockState);

    const previousYearArrow = screen.getByLabelText("previous year");
    fireEvent.click(previousYearArrow);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "tabela/setAno", payload: 2024 });
  });

  it("renders the next rodada arrow when there is a next rodada", () => {
    renderWithProvider(<TabelaHeader />, mockState);

    const nextRodadaArrow = screen.getByLabelText("next rodada");
    expect(nextRodadaArrow).toBeInTheDocument();
  });

  it("does not render the next rodada arrow when there is no next rodada", () => {
    mockState.tabela.temRodadaSeguinte = false;

    renderWithProvider(<TabelaHeader />, mockState);

    expect(screen.queryByLabelText("next rodada")).not.toBeInTheDocument();
  });

  it("dispatches the correct action when the next rodada arrow is clicked", () => {
    renderWithProvider(<TabelaHeader />, mockState);

    const nextRodadaArrow = screen.getByLabelText("next rodada");
    fireEvent.click(nextRodadaArrow);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "tabela/setRodada", payload: 2 });
  });

  it("dispatches the correct action when the previous rodada arrow is clicked", () => {
    mockState.tabela.rodada = 2;

    renderWithProvider(<TabelaHeader />, mockState);

    const previousRodadaArrow = screen.getByLabelText("previous rodada");
    fireEvent.click(previousRodadaArrow);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "tabela/setRodada", payload: 1 });
  });
});