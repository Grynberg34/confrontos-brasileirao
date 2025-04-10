"use client";

import React from "react";
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { resetTimes } from "@/store/slices/timesSlice";

const Confronto = () => {
  const dispatch = useDispatch<typeof import("@/store/store").store.dispatch>();
  const times = useSelector((state: RootState) => state.times);

  return (
    <Grid container spacing={2} className="confronto">
      <Grid size={{ xs: 4, sm: 4 }}>
        {
          times.timeX !== null ?
          <img className="confronto__time" src={`/times/${times.timeX}.png`} alt={times.timeX} />
          :<div className="confronto__placeholder"></div>
        }
      </Grid>

      <Grid size={{ xs: 4, sm: 4 }}>
        <h1 className="confronto__versus">X</h1>
        {(times.timeX !== null || times.timeY !== null) && (
          <button className="confronto__button" onClick={() => dispatch(resetTimes())}>mudar os times</button>
        )}

        {(times.timeX !== null && times.timeY !== null) && (
          <button className="confronto__button submit">pesquisar</button>
        )}
      </Grid>

      <Grid size={{ xs: 4, sm: 4 }}>
        {
          times.timeY !== null ?
          <img className="confronto__time right" src={`/times/${times.timeY}.png`} alt={times.timeY} />
          :<div className="confronto__placeholder right"></div>
        }
      </Grid>
    </Grid>
  );
};

export default Confronto;