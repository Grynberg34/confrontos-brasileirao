import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "../Filters";
import "@testing-library/jest-dom";

describe("Filters Component", () => {
  const mockSetFilters = {
    setFilter2025: jest.fn(),
    setSelectedYear: jest.fn(),
    setSelectedTeam: jest.fn(),
  };

  const mockResetSortConfig = jest.fn();

  const defaultProps = {
    filters: {
      filter2025: true,
      selectedYear: null,
      selectedTeam: null,
    },
    setFilters: mockSetFilters,
    availableYears: [2023, 2024, 2025],
    availableTeams: ["Team A", "Team B", "Team C"],
    resetSortConfig: mockResetSortConfig,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all filter options correctly", () => {
    render(<Filters {...defaultProps} />);

    const filter2025Checkbox = screen.getByLabelText("mostrar campanhas de 2025");
    expect(filter2025Checkbox).toBeInTheDocument();
    expect(filter2025Checkbox).toBeChecked();

    const yearDropdown = screen.getByTestId("Ano");
    expect(yearDropdown).toBeInTheDocument();
    expect(yearDropdown).toHaveValue("");

    const teamDropdown = screen.getByTestId("Time");
    expect(teamDropdown).toBeInTheDocument();
    expect(teamDropdown).toHaveValue("");
  });

  it("calls setFilter2025 and resetSortConfig when the 2025 filter is toggled", () => {
    render(<Filters {...defaultProps} />);

    const filter2025Checkbox = screen.getByLabelText("mostrar campanhas de 2025");
    fireEvent.click(filter2025Checkbox);

    expect(mockSetFilters.setFilter2025).toHaveBeenCalledWith(false);
    expect(mockResetSortConfig).toHaveBeenCalled();
  });
});