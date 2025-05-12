import React from "react";
import { render, screen } from "@testing-library/react";
import TableRows from "../TableRows";
import "@testing-library/jest-dom";
import { Campanha } from "@/store/types/campanhas";

describe("TableRows Component", () => {
  const mockSortedData: Campanha[] = [
    {
      originalIndex: 1,
      time: "Team A",
      ano: 2025,
      pontos: 30,
      jogos: 16,
      vitorias: 9,
      empates: 1,
      derrotas: 0,
      golsPro: 26,
      golsContra: 5,
      saldoGols: 20,
      aproveitamento: 90,
      posicaoFinal: 1,
    },
    {
      originalIndex: 2,
      time: "Team B",
      ano: 2024,
      pontos: 25,
      jogos: 14,
      vitorias: 8,
      empates: 1,
      derrotas: 1,
      golsPro: 20,
      golsContra: 15,
      saldoGols: 10,
      aproveitamento: 80,
      posicaoFinal: 2,
    },
  ];

  it("renders all rows correctly", () => {
    render(<TableRows sortedData={mockSortedData} />);

    expect(screen.getByText("Team A")).toBeInTheDocument();
    expect(screen.getByText("Team B")).toBeInTheDocument();
  });

  it("renders the correct data for each row", () => {
    render(<TableRows sortedData={mockSortedData} />);

    const teamARow = screen.getByText("Team A").closest(".campanhas__table__rows");
    expect(teamARow).toHaveTextContent("2025");
    expect(teamARow).toHaveTextContent("1°");
    expect(teamARow).toHaveTextContent("90%");
    expect(teamARow).toHaveTextContent("30");
    expect(teamARow).toHaveTextContent("16");
    expect(teamARow).toHaveTextContent("9");
    expect(teamARow).toHaveTextContent("1");
    expect(teamARow).toHaveTextContent("0");

    const teamBRow = screen.getByText("Team B").closest(".campanhas__table__rows");
    expect(teamBRow).toHaveTextContent("2024");
    expect(teamBRow).toHaveTextContent("2°");
    expect(teamBRow).toHaveTextContent("80%");
    expect(teamBRow).toHaveTextContent("25");
    expect(teamBRow).toHaveTextContent("8");
    expect(teamBRow).toHaveTextContent("1");
    expect(teamBRow).toHaveTextContent("1");
    expect(teamBRow).toHaveTextContent("20");
  });
});