import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import RecordesPage from "../page";
import { RecordesState } from "@/store/types/recordes";
import { fetchStreaks } from "@/store/slices/recordesSlice";
import { Store } from "redux";

jest.mock("@/store/slices/recordesSlice", () => ({
  fetchStreaks: jest.fn(),
  fetchPerformances: jest.fn(),
}));

describe("RecordesPage", () => {
  let mockState: { recordes: RecordesState };
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockState = {
      recordes: {
          winStreaks: [],
          unbeatenStreaks: [],
          lossStreaks: [],
          drawStreaks: [],
          homeWinStreaks: [],
          awayWinStreaks: [],
          mostGoalsScored: [],
          mostGoalsAgainst: [],
          goleadas: [],
          loading: false,
          error: null,
          mostWins: [],
          mostLosses: [],
          mostPoints: [],
          mostDraws: []
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
    mockState.recordes.loading = true;

    renderWithProvider(<RecordesPage />, mockState);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders the record sections when loading is false", () => {
    renderWithProvider(<RecordesPage />, mockState);

    expect(screen.getByText("Maiores goleadas")).toBeInTheDocument();
    expect(screen.getByText("Maiores sequências em uma edição")).toBeInTheDocument();
  });

  it("renders ComponenteTop5 and ComponenteSequencia components with correct props", () => {
    mockState.recordes = {
      ...mockState.recordes,
      mostGoalsScored: [{ team: "Team A", value: 50 }],
      mostGoalsAgainst: [{ team: "Team B", value: 40 }],
      winStreaks: [{ team: "Team C", season: 2025, streak: 10, matches: [] }],
      unbeatenStreaks: [{ team: "Team D", season: 2024, streak: 15, matches: [] }],
    };

    renderWithProvider(<RecordesPage />, mockState);

    expect(screen.getByText("Mais gols marcados")).toBeInTheDocument();
    expect(screen.getByText("Mais gols sofridos")).toBeInTheDocument();

    expect(screen.getByText("Sequência de vitórias")).toBeInTheDocument();
    expect(screen.getByText("Sequência invicta")).toBeInTheDocument();
  });

  it("dispatches fetchStreaks on mount", () => {
    renderWithProvider(<RecordesPage />, mockState);

    expect(mockDispatch).toHaveBeenCalledWith(fetchStreaks());
    expect(mockDispatch).toHaveBeenCalledWith(fetchStreaks());
  });
});