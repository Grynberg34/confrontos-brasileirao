import partidasReducer, { fetchPartidas } from "../partidasSlice";
import { PartidasState, PartidaRequest, ConfrontosData } from "../../types/partidas";
import axios from "axios";
import { AnyAction } from "@reduxjs/toolkit";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("partidasSlice", () => {
  let initialState: PartidasState;

  beforeEach(() => {
    initialState = {
      data: null,
      loading: false,
      error: null,
    };
  });

  it("should handle initial state", () => {
    const state = partidasReducer(undefined, {} as AnyAction);
    expect(state).toEqual(initialState);
  });

  describe("fetchPartidas", () => {
    it("should set loading to true when fetchPartidas is pending", () => {
      const action = { type: fetchPartidas.pending.type };
      const state = partidasReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should set data and loading to false when fetchPartidas is fulfilled", async () => {
      const mockResponse: ConfrontosData = {
        confrontos: [
          {
            id: 1,
            data: "2023-05-01",
            rodada: 1,
            ano: 2023,
            time_mandante: "Team A",
            time_visitante: "Team B",
            gols_mandante: 2,
            gols_visitante: 1,
            resultado: "2 x 1",
            tecnico_mandante: "Coach A",
            tecnico_visitante: "Coach B",
            gols_jogadores_mandante: null,
            gols_jogadores_visitante: null,
          },
        ],
        empates: 0,
        ultimosEmpates: 0,
        timeX: {
          nome: "Team A",
          vitorias: 10,
          gols: 25,
          pontos: 30,
          ultimasVitorias: 3,
          homeStats: {
            vitorias: 5,
            empates: 2,
          },
        },
        timeY: {
          nome: "Team B",
          vitorias: 8,
          gols: 20,
          pontos: 24,
          ultimasVitorias: 2,
          homeStats: {
            vitorias: 4,
            empates: 1,
          },
        },
      };

      mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

      const action = await fetchPartidas.fulfilled(mockResponse, "", {
        timeX: "Team A",
        timeY: "Team B",
      } as PartidaRequest);

      const state = partidasReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.data).toEqual(mockResponse);
      expect(state.error).toBeNull();
    });

    it("should set error and loading to false when fetchPartidas is rejected", async () => {
      const mockError = "Network Error";

      mockedAxios.post.mockRejectedValueOnce(new Error(mockError));

      const action = await fetchPartidas.rejected(
        new Error(mockError),
        "",
        { timeX: "Team A", timeY: "Team B" } as PartidaRequest
      );

      const state = partidasReducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(mockError);
      expect(state.data).toBeNull();
    });
  });
});