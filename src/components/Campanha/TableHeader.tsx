import React from "react";
import Grid from "@mui/material/Grid";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface TableHeaderProps {
  sortConfig: { key: string; direction: string };
  handleSort: (key: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  sortConfig,
  handleSort,
}) => {
  const headers = [
    { key: "posicaoFinal", label: "°" },
    { key: "aproveitamento", label: "%", size: { xs: 2, sm: 1 } },
    { key: "pontos", label: "P" },
    { key: "jogos", label: "J" },
    { key: "vitorias", label: "V" },
    { key: "empates", label: "E" },
    { key: "derrotas", label: "D" },
    { key: "golsPro", label: "GP",  className: "hide-mobile"  },
    { key: "golsContra", label: "GC", className: "hide-mobile"},
  ];

  const getArrowIcon = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? (
        <ArrowDropUpIcon className="campanhas__table__header__arrow" />
      ) : (
        <ArrowDropDownIcon className="campanhas__table__header__arrow" />
      );
    }
    return null;
  };

  return (
    <Grid container spacing={{ xs: 1, sm: 2 }} className="campanhas__table__header">
      <Grid size={{ xs: 4, sm: 3 }}>
        <h1 className="campanhas__table__header__title time">Time</h1>
      </Grid>
      {headers.map((header) => (
        <Grid size={header.size || { xs: 1, sm: 1 }} key={header.key} className={header.className || ""}>
          <h1
            className={`campanhas__table__header__title ${
              sortConfig.key === header.key ? "active" : ""
            }`}
            onClick={() => handleSort(header.key)}
          >
            {header.label} {getArrowIcon(header.key)}
          </h1>
        </Grid>
      ))}
    </Grid>
  );
};

export default TableHeader;