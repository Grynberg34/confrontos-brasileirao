import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableHeader from "../TableHeader";
import "@testing-library/jest-dom";

describe("TableHeader Component", () => {
  const mockHandleSort = jest.fn();

  const defaultProps = {
    sortConfig: { key: "aproveitamento", direction: "desc" },
    handleSort: mockHandleSort,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all headers correctly", () => {
    render(<TableHeader {...defaultProps} />);

    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("°")).toBeInTheDocument();
    expect(screen.getByText("%")).toBeInTheDocument();
    expect(screen.getByText("P")).toBeInTheDocument();
    expect(screen.getByText("J")).toBeInTheDocument();
    expect(screen.getByText("V")).toBeInTheDocument();
    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
    expect(screen.getByText("GP")).toBeInTheDocument();
    expect(screen.getByText("GC")).toBeInTheDocument();
  });

  it("applies the active class to the sorted column", () => {
    render(<TableHeader {...defaultProps} />);

    const sortedHeader = screen.getByText("%");
    expect(sortedHeader).toHaveClass("active");
  });

  it("displays the correct sort icon for ascending order", () => {
    const props = {
      ...defaultProps,
      sortConfig: { key: "pontos", direction: "asc" },
    };

    render(<TableHeader {...props} />);

    const pontosHeader = screen.getByText("P");
    expect(pontosHeader).toBeInTheDocument();
    expect(pontosHeader.querySelector(".campanhas__table__header__arrow")).toBeInTheDocument();
  });

  it("displays the correct sort icon for descending order", () => {
    const props = {
      ...defaultProps,
      sortConfig: { key: "pontos", direction: "desc" },
    };

    render(<TableHeader {...props} />);

    const pontosHeader = screen.getByText("P");
    expect(pontosHeader).toBeInTheDocument();
    expect(pontosHeader.querySelector(".campanhas__table__header__arrow")).toBeInTheDocument();
  });

  it("calls handleSort with the correct key when a header is clicked", () => {
    render(<TableHeader {...defaultProps} />);

    const pontosHeader = screen.getByText("P");
    fireEvent.click(pontosHeader);

    expect(mockHandleSort).toHaveBeenCalledWith("pontos");
  });

  it("does not display a sort icon for unsorted columns", () => {
    render(<TableHeader {...defaultProps} />);

    const timeHeader = screen.getByText("Time");
    expect(timeHeader.querySelector(".campanhas__table__header__arrow")).not.toBeInTheDocument();
  });
});