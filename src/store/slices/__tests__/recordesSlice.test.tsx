import reducer, { fetchStreaks, fetchPerformances } from "../recordesSlice";
import { RecordesState } from "@/store/types/recordes";
import axios from "axios";
import { AnyAction } from "@reduxjs/toolkit";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("recordesSlice", () => {
  let initialState: RecordesState;

  beforeEach(() => {
    initialState = {
      winStreaks: [],
      unbeatenStreaks: [],
      lossStreaks: [],
      drawStreaks: [],
      homeWinStreaks: [],
      awayWinStreaks: [],
      bestFirstHalf: undefined,
      bestSecondHalf: undefined,
      bestHomeSeason: undefined,
      bestAwaySeason: undefined,
      goleadas: [],
      mostWins: [],
      mostLosses: [],
      mostPoints: [],
      mostGoalsScored: [],
      mostDraws: [],
      mostGoalsAgainst: [],
      loading: false,
      error: null,
    };
  });

  it("should handle initial state", () => {
    const state = reducer(undefined, {} as AnyAction);
    expect(state).toEqual(initialState);
  });

  describe("fetchStreaks", () => {
    it("should set loading to true when fetchStreaks is pending", () => {
      const action = { type: fetchStreaks.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should set streaks and loading to false when fetchStreaks is fulfilled", async () => {
      const mockData = {
        winStreaks: [{ team: "Team A", season: 2025, streak: 10, matches: [] }],
        unbeatenStreaks: [{ team: "Team B", season: 2024, streak: 15, matches: [] }],
        lossStreaks: [{ team: "Team C", season: 2023, streak: 8, matches: [] }],
        drawStreaks: [{ team: "Team D", season: 2022, streak: 5, matches: [] }],
        homeWinStreaks: [{ team: "Team E", season: 2021, streak: 12, matches: [] }],
        awayWinStreaks: [{ team: "Team F", season: 2020, streak: 9, matches: [] }],
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const action = await fetchStreaks.fulfilled(mockData, "", undefined);
      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.winStreaks).toEqual(mockData.winStreaks);
      expect(state.unbeatenStreaks).toEqual(mockData.unbeatenStreaks);
      expect(state.lossStreaks).toEqual(mockData.lossStreaks);
      expect(state.drawStreaks).toEqual(mockData.drawStreaks);
      expect(state.homeWinStreaks).toEqual(mockData.homeWinStreaks);
      expect(state.awayWinStreaks).toEqual(mockData.awayWinStreaks);
      expect(state.error).toBeNull();
    });

    it("should set error and loading to false when fetchStreaks is rejected", async () => {
      const mockError = "Network Error";
      mockedAxios.get.mockRejectedValueOnce(new Error(mockError));

      const action = await fetchStreaks.rejected(new Error(mockError), "", undefined);
      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(mockError);
      expect(state.winStreaks).toEqual([]);
    });
  });

  describe("fetchPerformances", () => {
    it("should set loading to true when fetchPerformances is pending", () => {
      const action = { type: fetchPerformances.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should set performances and loading to false when fetchPerformances is fulfilled", async () => {
      const mockData = {
        bestFirstHalf: { team: "Team A", season: 2025, pontos: 30 },
        bestSecondHalf: { team: "Team B", season: 2024, pontos: 28 },
        bestHomeSeason: { team: "Team C", season: 2023, pontos: 32 },
        bestAwaySeason: { team: "Team D", season: 2022, pontos: 26 },
        topBlowoutGamesByDifference: [],
        mostWins: [],
        mostLosses: [],
        mostPoints: [],
        mostGoalsScored: [],
        mostDraws: [],
        mostGoalsAgainst: [],
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const action = await fetchPerformances.fulfilled(mockData, "", undefined);
      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.bestFirstHalf).toEqual(mockData.bestFirstHalf);
      expect(state.bestSecondHalf).toEqual(mockData.bestSecondHalf);
      expect(state.bestHomeSeason).toEqual(mockData.bestHomeSeason);
      expect(state.bestAwaySeason).toEqual(mockData.bestAwaySeason);
      expect(state.error).toBeNull();
    });

    it("should set error and loading to false when fetchPerformances is rejected", async () => {
      const mockError = "An error occurred while fetching performances";
      mockedAxios.get.mockRejectedValueOnce(new Error(mockError));

      const action = await fetchPerformances.rejected(new Error(mockError), "", undefined);
      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(mockError);
      expect(state.bestFirstHalf).toBeUndefined();
    });
  });
});