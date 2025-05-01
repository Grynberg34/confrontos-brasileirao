import React from "react";
import Grid from '@mui/material/Grid';
import Link from "next/link";

const Tools = () => {

    return (
        <div className="tools">
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Link className="tools__link" href='/confrontos'>
                        <span className="tools__link__title">Time x time</span>
                        <h1 className="tools__link__text">Histórico de confrontos</h1>
                    </Link>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Link className="tools__link" href='/tabela'>
                        <span className="tools__link__title">Todas as edições</span>
                        <h1 className="tools__link__text green">Tabela rodada a rodada</h1>
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default Tools;