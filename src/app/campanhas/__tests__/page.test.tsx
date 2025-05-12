import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import TabelaCampanhas from "../page";
import { CampanhasState } from "@/store/types/campanhas";
import { fetchCampanhas } from "@/store/slices/campanhasSlice";
import { Store } from "redux";
import "@testing-library/jest-dom";

jest.mock("@/store/slices/campanhasSlice", () => ({
  fetchCampanhas: jest.fn(),
}));

describe("TabelaCampanhas Page", () => {
  let mockState: { campanhas: CampanhasState };
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockState = {
      campanhas: {
        campanhas: [],
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

  it("renders a loading spinner when loading is true", () => {
    mockState.campanhas.loading = true;

    renderWithProvider(<TabelaCampanhas />, mockState);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("dispatches fetchCampanhas on mount", () => {
    renderWithProvider(<TabelaCampanhas />, mockState);

    expect(fetchCampanhas).toHaveBeenCalled();
  });
});