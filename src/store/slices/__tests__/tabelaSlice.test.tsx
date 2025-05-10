import tabelaReducer, { fetchTabela, setAno, setRodada } from "../tabelaSlice";
import { Tabela } from "../../types/tabela";
import axios from "axios";
import { AnyAction } from "@reduxjs/toolkit";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("tabelaSlice", () => {
  let initialState: Tabela;

  beforeEach(() => {
    initialState = {
      tabela: [],
      jogosDaRodada: [],
      ano: 2025,
      rodada: 1,
      loading: false,
      error: null,
      temRodadaSeguinte: false,
    };
  });

  it("should handle initial state", () => {
    const state = tabelaReducer(undefined, {} as AnyAction);
    expect(state).toEqual(initialState);
  });

  describe("reducers", () => {
    it("should handle setAno", () => {
      const state = tabelaReducer(initialState, setAno(2024));
      expect(state.ano).toBe(2024);
    });

    it("should handle setRodada", () => {
      const state = tabelaReducer(initialState, setRodada(2));
      expect(state.rodada).toBe(2);
    });
  });

  describe("fetchTabela", () => {
    it("should set loading to true when fetchTabela is pending", () => {
      const action = { type: fetchTabela.pending.type };
      const state = tabelaReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should set data and loading to false when fetchTabela is fulfilled", async () => {
      const mockResponse = {
        tabela: [
          {
            time: "Team A",
            pontos: 30,
            golsPro: 40,
            golsContra: 20,
            saldo: 20,
            vitorias: 10,
            empates: 0,
            derrotas: 0,
          },
        ],
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
        temRodadaSeguinte: true,
      };

      mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

      const action = await fetchTabela.fulfilled(mockResponse, "", { rodada: 1, ano: 2025 });
      const state = tabelaReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.tabela).toEqual(mockResponse.tabela);
      expect(state.jogosDaRodada).toEqual(mockResponse.jogosDaRodada);
      expect(state.ano).toBe(2025);
      expect(state.rodada).toBe(1);
      expect(state.temRodadaSeguinte).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should set error and loading to false when fetchTabela is rejected", async () => {
      const mockError = "Network Error";

      mockedAxios.post.mockRejectedValueOnce(new Error(mockError));

      const action = await fetchTabela.rejected(
        new Error(mockError),
        "",
        { rodada: 1, ano: 2025 }
      );

      const state = tabelaReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.tabela).toEqual([]);
      expect(state.jogosDaRodada).toEqual([]);
    });
  });
});