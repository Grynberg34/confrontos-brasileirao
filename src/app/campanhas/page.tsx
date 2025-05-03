"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampanhas } from "@/store/slices/campanhasSlice";
import { AppDispatch, RootState } from "@/store/store";
import Header from "@/components/Header/Header";
import Filters from "@/components/Campanha/Filters";
import TableHeader from "@/components/Campanha/TableHeader";
import TableRows from "@/components/Campanha/TableRows";
import CircularProgress from "@mui/material/CircularProgress";

const TabelaCampanhas: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { campanhas, loading } = useSelector(
    (state: RootState) => state.campanhas
  );

  const [sortedData, setSortedData] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState({
    key: "aproveitamento",
    direction: "desc",
  });

  const resetSortConfig = () => {
    setSortConfig({ key: "aproveitamento", direction: "desc" });
  };

  const [filter2025, setFilter2025] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCampanhas());
  }, [dispatch]);

  useEffect(() => {
    const sorted = [...campanhas].sort((a, b) => {
      const key = sortConfig.key as keyof typeof campanhas[0];
      const direction = sortConfig.direction === "asc" ? 1 : -1;

      if (a[key] < b[key]) return -1 * direction;
      if (a[key] > b[key]) return 1 * direction;
      return 0;
    });

    const sortedWithIndex = sorted
      .filter((campanha) => filter2025 || campanha.ano !== 2025)
      .map((campanha, index) => ({
        ...campanha,
        originalIndex: index + 1,
      }));

    let filtered = sortedWithIndex;

    if (selectedYear) {
      filtered = filtered.filter((campanha) => campanha.ano === selectedYear);
    }
    if (selectedTeam) {
      filtered = filtered.filter((campanha) => campanha.time === selectedTeam);
    }

    setSortedData(filtered);
  }, [campanhas, filter2025, selectedYear, selectedTeam, sortConfig]);

  if (loading)
    return (
      <div className="campanhas">
        <Header />
        <div className="campanhas__loading">
          <CircularProgress
            className="campanhas__loading__icon"
            color="inherit"
          />
        </div>
      </div>
    );

  const availableYears = [
    ...new Set(campanhas.map((campanha) => campanha.ano)),
  ].sort((a, b) => a - b);
  const availableTeams = [
    ...new Set(campanhas.map((campanha) => campanha.time)),
  ].sort();

  const filters = {
    filter2025,
    selectedYear,
    selectedTeam,
  };

  const setFilters = {
    setFilter2025,
    setSelectedYear,
    setSelectedTeam,
  };

  return (
    <div className="campanhas">
      <Header />
      {campanhas.length > 0 && (
        <>
          <Filters
            filters={filters}
            setFilters={setFilters}
            availableYears={availableYears}
            availableTeams={availableTeams}
            resetSortConfig={resetSortConfig}
          />
          <div className="campanhas__table">
            <TableHeader
              sortConfig={sortConfig}
              handleSort={(key) =>
                setSortConfig((prev) => ({
                  key,
                  direction:
                    prev.key === key && prev.direction === "asc"
                      ? "desc"
                      : "asc",
                }))
              }
            />
            <TableRows sortedData={sortedData} />
          </div>
        </>
      )}
    </div>
  );
};

export default TabelaCampanhas;