"use client";

import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { resetTimes } from "@/store/slices/timesSlice";
import { fetchPartidas } from "@/store/slices/partidasSlice";
import CircularProgress from '@mui/material/CircularProgress';

const Display = () => {
  const dispatch = useDispatch<typeof import("@/store/store").store.dispatch>();
  const times = useSelector((state: RootState) => state.times);

  const [loading, setLoading] = useState(false);

  const handleFetchPartidas = () => {
    if (times.timeX && times.timeY) {
      setLoading(true);
      setTimeout(() => {
        dispatch(fetchPartidas({ timeX: times.timeX!, timeY: times.timeY! }));
      }, 2000);
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
          <button className="display__options__button submit" onClick={handleFetchPartidas} disabled={loading}>
          {loading ? <CircularProgress size={20} color="inherit" /> : "pesquisar confronto"}
        </button>
        )}

      </div>


    </div>
  );
};

export default Display;