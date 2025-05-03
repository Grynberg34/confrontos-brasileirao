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
        },
        {
            href: '/tabela',
            title: '2023-2025',
            text: 'Tabela rodada a rodada',
            className: 'tools__link special',
        },
        {
            href: '/campanhas',
            title: '2023-2025',
            text: 'Ranking de campanhas',
            className: 'tools__link special',
        },
        {
            href: '/campanhas',
            title: 'Históricas e ativas',
            text: 'Sequências invictas',
            className: 'tools__link',
        },
    ];

    return (
        <div className="tools">
            <Grid container spacing={4}>
                {links.map((link, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
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