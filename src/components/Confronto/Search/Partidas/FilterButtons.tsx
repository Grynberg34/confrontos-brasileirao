import React from "react";

interface FilterProps {
  filter: "all" | "timeXHome" | "timeYHome";
  setFilter: (filter: "all" | "timeXHome" | "timeYHome") => void;
  times: { timeX: string; timeY: string };
}

const FilterButtons: React.FC<FilterProps> = ({ filter, setFilter, times }) => {
  return (
    <div className="partidas__filter">
      <h1 className="partidas__filter__text">filtrar:</h1>
      <button
        className={`partidas__filter__button ${filter === "all" ? "selected" : ""}`}
        onClick={() => setFilter("all")}
      >
        Todos
      </button>
      <button
        className={`partidas__filter__button ${filter === "timeXHome" ? "selected" : ""}`}
        onClick={() => setFilter("timeXHome")}
      >
        {times.timeX} mandante
      </button>
      <button
        className={`partidas__filter__button ${filter === "timeYHome" ? "selected" : ""}`}
        onClick={() => setFilter("timeYHome")}
      >
        {times.timeY} mandante
      </button>
    </div>
  );
};

export default FilterButtons;