import reducer, { fetchCampanhas } from "../campanhasSlice";
import { CampanhasState } from "@/store/types/campanhas";
import axios from "axios";
import { AnyAction } from "@reduxjs/toolkit";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("campanhasSlice", () => {
  let initialState: CampanhasState;

  beforeEach(() => {
    initialState = {
      campanhas: [],
      loading: false,
      error: null,
    };
  });

  it("should handle initial state", () => {
    const state = reducer(undefined, {} as AnyAction);
    expect(state).toEqual(initialState);
  });

  describe("fetchCampanhas", () => {
    it("should set loading to true when fetchCampanhas is pending", () => {
      const action = { type: fetchCampanhas.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should set campanhas and loading to false when fetchCampanhas is fulfilled", async () => {
      const mockData = [
        {
          originalIndex: 1,
          time: "Team A",
          ano: 2025,
          pontos: 30,
          jogos: 10,
          vitorias: 9,
          empates: 1,
          derrotas: 0,
          golsPro: 25,
          golsContra: 5,
          saldoGols: 20,
          aproveitamento: 90,
          posicaoFinal: 1,
        },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const action = await fetchCampanhas.fulfilled(mockData, "", undefined);

      const state = reducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.campanhas).toEqual(mockData);
      expect(state.error).toBeNull();
    });
    
    it("should set error and loading to false when fetchCampanhas is rejected", async () => {
    const mockError = "Network Error";

    mockedAxios.get.mockRejectedValueOnce(new Error(mockError));

    const action = await fetchCampanhas.rejected(
      {
        message: mockError,
        name: ""
      },
      "",
      undefined
    );

    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(mockError);
    expect(state.campanhas).toEqual([]);
    });
  });
});