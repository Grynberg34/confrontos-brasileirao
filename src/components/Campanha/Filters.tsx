import React from "react";
import Grid from "@mui/material/Grid";

interface FiltersProps {
  filters: {
    filter2025: boolean;
    selectedYear: number | null;
    selectedTeam: string | null;
  };
  setFilters: {
    setFilter2025: (value: boolean) => void;
    setSelectedYear: (value: number | null) => void;
    setSelectedTeam: (value: string | null) => void;
  };
  availableYears: number[];
  availableTeams: string[];
  resetSortConfig: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  setFilters,
  availableYears,
  availableTeams,
  resetSortConfig,
}) => {
  const { filter2025, selectedYear, selectedTeam } = filters;
  const { setFilter2025, setSelectedYear, setSelectedTeam } = setFilters;

  const handleFilter2025Change = () => {
    setFilter2025(!filter2025);
    resetSortConfig();
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value ? parseInt(e.target.value) : null);
    resetSortConfig();
  };

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(e.target.value || null);
    resetSortConfig();
  };

  return (
    <div className="campanhas__filters">
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid className="hide-mobile" size={{ xs: 2, sm: 2 }}></Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <label className="campanhas__filters__checkbox">
            <input
              className="campanhas__filters__input"
              type="checkbox"
              checked={filter2025}
              onChange={handleFilter2025Change}
            />
            mostrar campanhas de 2025
          </label>
        </Grid>
        <Grid size={{ xs: 3, sm: 2 }}>
          <h1 className="campanhas__filters__title">Filtrar:</h1>
        </Grid>

        <Grid size={{ xs: 4, sm: 2 }}>
          <select
            className="campanhas__filters__select"
            value={selectedYear || ""}
            onChange={handleYearChange}
          >
            <option className="campanhas__filters__select__option" value="">
              Todos os anos
            </option>
            {availableYears.map((year) => (
              <option
                className="campanhas__filters__select__option"
                key={year}
                value={year}
              >
                {year}
              </option>
            ))}
          </select>
        </Grid>

        <Grid size={{ xs: 4, sm: 2 }}>
          <select
            className="campanhas__filters__select"
            value={selectedTeam || ""}
            onChange={handleTeamChange}
          >
            <option className="campanhas__filters__select__option" value="">
              Todos os times
            </option>
            {availableTeams.map((team) => (
              <option
                className="campanhas__filters__select__option"
                key={team}
                value={team}
              >
                {team}
              </option>
            ))}
          </select>
        </Grid>
      </Grid>
    </div>
  );
};

export default Filters;