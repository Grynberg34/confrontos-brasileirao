"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { fetchTimes, addTime } from "@/store/slices/timesSlice";
import { AppDispatch } from "@/store/store";

const Teams = () => {
  const dispatch: AppDispatch = useDispatch();
  const times = useSelector((state: RootState) => state.times);

  useEffect(() => {
    if (times.list.length === 0) {
      dispatch(fetchTimes());
    }
  }, [dispatch, times.timeX, times.timeY]);

  const handleClick = (time: string) => {
    if (time === times.timeX) {
      return;
    }

    if (window.innerWidth <= 767) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    dispatch(addTime(time));
  };

  if (times.list.length === 0) {
    return <div className="times">
      <h1 className="times__text">carregando times...</h1>
    </div>;
  } 

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