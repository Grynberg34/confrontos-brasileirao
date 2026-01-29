import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "../Filters";
import "@testing-library/jest-dom";

describe("Filters Component", () => {
  const mockSetFilters = {
    setFilter2026: jest.fn(),
    setSelectedYear: jest.fn(),
    setSelectedTeam: jest.fn(),
  };

  const mockResetSortConfig = jest.fn();

  const defaultProps = {
    filters: {
      filter2026: true,
      selectedYear: null,
      selectedTeam: null,
    },
    setFilters: mockSetFilters,
    availableYears: [2023, 2024, 2026],
    availableTeams: ["Team A", "Team B", "Team C"],
    resetSortConfig: mockResetSortConfig,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all filter options correctly", () => {
    render(<Filters {...defaultProps} />);

    const filter2026Checkbox = screen.getByLabelText("mostrar campanhas de 2026");
    expect(filter2026Checkbox).toBeInTheDocument();
    expect(filter2026Checkbox).toBeChecked();

    const yearDropdown = screen.getByTestId("Ano");
    expect(yearDropdown).toBeInTheDocument();
    expect(yearDropdown).toHaveValue("");

    const teamDropdown = screen.getByTestId("Time");
    expect(teamDropdown).toBeInTheDocument();
    expect(teamDropdown).toHaveValue("");
  });

  it("calls setFilter2026 and resetSortConfig when the 2026 filter is toggled", () => {
    render(<Filters {...defaultProps} />);

    const filter2026Checkbox = screen.getByLabelText("mostrar campanhas de 2026");
    fireEvent.click(filter2026Checkbox);

    expect(mockSetFilters.setFilter2026).toHaveBeenCalledWith(false);
    expect(mockResetSortConfig).toHaveBeenCalled();
  });
});