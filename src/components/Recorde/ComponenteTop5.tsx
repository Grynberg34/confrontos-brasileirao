import React from "react";
import Grid from "@mui/material/Grid";

interface Top5Record {
  team: string;
  value: number;
}

interface ComponenteTop5Props {
  title: string;
  records: Top5Record[];
}

const ComponenteTop5: React.FC<ComponenteTop5Props> = ({ title, records }) => {
  return (
    <div className="recordes__top">
      <h2 className="recordes__top__title">{title}</h2>
        {records.map((record, index) => (
            <div className="recordes__top__item" key={index}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 2, sm: 2 }}>
                        <h1 className="recordes__top__item__position">{index + 1}.</h1>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 2 }}>
                        <img className="recordes__top__item__img" src={`/times/${record.team}.png`} alt="" />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 6 }}>
                        <h1 className="recordes__top__item__team">{record.team}</h1>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 2 }}>
                        <h1 className="recordes__top__item__value">{record.value}</h1>
                    </Grid>
                </Grid>
            </div>
        ))}
    </div>
  );
};

export default ComponenteTop5;