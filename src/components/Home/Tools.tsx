import React from "react";
import Grid from '@mui/material/Grid';
import Link from "next/link";

const Tools = () => {
    const links = [
        {
            href: '/confrontos',
            title: 'Time x time',
            text: 'Histórico de confrontos',
            className: 'tools__link',
            order: { xs: 1, sm: 1 }
        },
        {
            href: '/tabela',
            title: '2003-2025',
            text: 'Tabela rodada a rodada',
            className: 'tools__link special',
            order: { xs: 2, sm: 2 }
        },
        {
            href: '/campanhas',
            title: 'Todas as edições',
            text: 'Ranking de campanhas',
            className: 'tools__link special',
            order: { xs: 4, sm: 3 }
        },
        {
            href: '/recordes',
            title: 'Todas as edições',
            text: 'Recordes coletivos',
            className: 'tools__link',
            order: { xs: 3, sm: 4 }
        },
    ];

    return (
        <div className="tools">
            <Grid container spacing={4}>
                {links.map((link, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={index} order={link.order}>
                        <Link className={link.className} href={link.href}>
                            <span className="tools__link__title">{link.title}</span>
                            <h1 className={`tools__link__text ${index === 1 || index === 2 ? 'green' : ''}`}>
                                {link.text}
                            </h1>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Tools;