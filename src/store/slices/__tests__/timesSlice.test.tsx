import reducer, { fetchTimes, addTime, resetTimes } from "../timesSlice";
import { TimesState } from "@/store/types/times";
import axios from "axios";
import { AnyAction } from "@reduxjs/toolkit";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("timesSlice", () => {
  let initialState: TimesState;

  beforeEach(() => {
    initialState = {
      list: [],
      timeX: null,
      timeY: null,
      loading: false,
      error: null,
    };
  });

  it("should handle initial state", () => {
    const state = reducer(undefined, {} as AnyAction);
    expect(state).toEqual(initialState);
  });

  describe("reducers", () => {
    it("should handle addTime when timeX is null", () => {
      const action = { type: addTime.type, payload: "Team A" };
      const state = reducer(initialState, action);
      expect(state.timeX).toBe("Team A");
      expect(state.timeY).toBeNull();
    });

    it("should handle addTime when timeX is set and timeY is null", () => {
      const stateWithTimeX = { ...initialState, timeX: "Team A" };
      const action = { type: addTime.type, payload: "Team B" };
      const state = reducer(stateWithTimeX, action);
      expect(state.timeX).toBe("Team A");
      expect(state.timeY).toBe("Team B");
    });

    it("should not change timeX or timeY if both are already set", () => {
      const stateWithBothTimes = { ...initialState, timeX: "Team A", timeY: "Team B" };
      const action = { type: addTime.type, payload: "Team C" };
      const state = reducer(stateWithBothTimes, action);
      expect(state.timeX).toBe("Team A");
      expect(state.timeY).toBe("Team B");
    });

    it("should handle resetTimes", () => {
      const stateWithBothTimes = { ...initialState, timeX: "Team A", timeY: "Team B" };
      const action = { type: resetTimes.type };
      const state = reducer(stateWithBothTimes, action);
      expect(state.timeX).toBeNull();
      expect(state.timeY).toBeNull();
    });
  });

  describe("fetchTimes", () => {
    it("should set loading to true when fetchTimes is pending", () => {
      const action = { type: fetchTimes.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should set the list and loading to false when fetchTimes is fulfilled", async () => {
      const mockData = ["Team A", "Team B", "Team C"];
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const action = await fetchTimes.fulfilled(mockData, "", undefined);
      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.list).toEqual(mockData);
      expect(state.error).toBeNull();
    });

    it("should set error and loading to false when fetchTimes is rejected", async () => {
      const mockError = "Network Error";
      mockedAxios.get.mockRejectedValueOnce(new Error(mockError));

      const action = await fetchTimes.rejected(new Error(mockError), "", undefined);
      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(mockError);
      expect(state.list).toEqual([]);
    });
  });
});