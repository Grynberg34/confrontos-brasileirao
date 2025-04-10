"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { fetchTimes, addTime } from "@/store/slices/timesSlice";

const Teams = () => {
  const dispatch = useDispatch<typeof import("@/store/store").store.dispatch>();
  const times = useSelector((state: RootState) => state.times);

  useEffect(() => {
    if (times.list.length === 0) {
      dispatch(fetchTimes());
    }
  }, [dispatch, times.timeX, times.timeY]);

  const handleClick = (time: string) => {
    dispatch(addTime(time));
  };

  return (
    <div className="times">
      {times.list.length > 0 && (
        <div className="times__lista">
          {times.list.map((time, index) => (
            <div key={index} className="times__lista__time">
              <img className="times__lista__time__img" src={`/times/${time}.png`} alt={time} onClick={() => handleClick(time)}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teams;