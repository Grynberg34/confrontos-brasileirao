"use client";

import React from "react";
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { resetTimes } from "@/store/slices/timesSlice";
import { fetchPartidas } from "@/store/slices/partidasSlice";

const Display = () => {
  const dispatch = useDispatch<typeof import("@/store/store").store.dispatch>();
  const times = useSelector((state: RootState) => state.times);

  const handleFetchPartidas = () => {
    if (times.timeX && times.timeY) {
      dispatch(fetchPartidas({ timeX: times.timeX, timeY: times.timeY }));
    }
  };

  return (
    <div className="display">
      <Grid container spacing={2}>
        <Grid size={{ xs: 4, sm: 4 }}>
          {
            times.timeX !== null ?
            <img className="display__time" src={`/times/${times.timeX}.png`} alt={times.timeX} />
            :<div className="display__placeholder"></div>
          }
        </Grid>

        <Grid size={{ xs: 4, sm: 4 }}>
          <h1 className="display__versus">X</h1>
        </Grid>

        <Grid size={{ xs: 4, sm: 4 }}>
          {
            times.timeY !== null ?
            <img className="display__time right" src={`/times/${times.timeY}.png`} alt={times.timeY} />
            :<div className="display__placeholder right"></div>
          }
        </Grid>
      </Grid>

      <div className="display__options">

        {(times.timeX !== null || times.timeY !== null) && (
          <button className="display__options__button" onClick={() => dispatch(resetTimes())}>mudar times</button>
        )}

        {(times.timeX !== null && times.timeY !== null) && (
          <button className="display__options__button submit" onClick={handleFetchPartidas}>ver confronto</button>
        )}

      </div>


    </div>
  );
};

export default Display;