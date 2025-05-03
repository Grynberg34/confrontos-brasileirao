import React from "react";
import Grid from "@mui/material/Grid";
import { Campanha } from "@/store/types/campanhas";

interface TableRowsProps {
  sortedData: Campanha[];
}

const TableRows: React.FC<TableRowsProps> = ({ sortedData }) => {
  return (
    <>
      {sortedData.map((campanha) => (
        <Grid
          container
          spacing={{ xs: 1, sm: 2 }}
          className="campanhas__table__rows"
          key={campanha.originalIndex}
        >
          <Grid size={{ xs: 1, sm: 1 }}>
            <h2 className="campanhas__table__rows__title index">
              {campanha.originalIndex}
            </h2>
          </Grid>
          <Grid size={{ xs: 3, sm: 2 }}>
            <div className="campanhas__table__rows__team">
              <img
                className="campanhas__table__rows__team__img"
                src={`/times/${campanha.time}.png`}
                alt=""
              />
              <h2 className="campanhas__table__rows__team__title">
                {campanha.time} <span className="ano">{campanha.ano}</span>
              </h2>
            </div>
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }}>
            <h2 className="campanhas__table__rows__title">
              {campanha.posicaoFinal}°
            </h2>
          </Grid>
          <Grid size={{ xs: 2, sm: 1 }}>
            <h2 className="campanhas__table__rows__title">
              {campanha.aproveitamento}%
            </h2>
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }}>
            <h2 className="campanhas__table__rows__title">{campanha.pontos}</h2>
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }}>
            <h2 className="campanhas__table__rows__title">{campanha.jogos}</h2>
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }}>
            <h2 className="campanhas__table__rows__title">
              {campanha.vitorias}
            </h2>
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }}>
            <h2 className="campanhas__table__rows__title">
              {campanha.empates}
            </h2>
          </Grid>
          <Grid size={{ xs: 1, sm: 1 }}>
            <h2 className="campanhas__table__rows__title">
              {campanha.derrotas}
            </h2>
          </Grid>
          <Grid className="hide-mobile" size={{ xs: 1, sm: 1 }}>
            <h2 className="campanhas__table__rows__title">
              {campanha.golsPro}
            </h2>
          </Grid>
          <Grid className="hide-mobile" size={{ xs: 1, sm: 1 }}>
            <h2 className="campanhas__table__rows__title">
              {campanha.golsContra}
            </h2>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default TableRows;