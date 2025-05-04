export interface Match {
    date: string;
    rodada: number;
    homeTeam: string;
    awayTeam: string;
    homeGoals: number;
    awayGoals: number;
}

export interface Sequencia {
    team: string;
    season: number;
    streak: number;
    matches: Match[];
}

export interface Performance {
    team: string;
    season: number;
    pontos: number;
    vitorias: number;
    draws: number;
    losses: number;
    golsPro: number;
    golsContra: number;
    saldoGols: number;
    jogos: number;
    aproveitamento: string;
    half?: string; 
}

export interface Goleada {
    date: string;
    year: number;
    rodada: number;
    homeTeam: string;
    awayTeam: string;
    homeGoals: number;
    awayGoals: number;
    goalDifference?: number;
    totalGoals?: number;
}

export interface RecordesState {
    winStreaks: Sequencia[];
    unbeatenStreaks: Sequencia[];
    lossStreaks: Sequencia[];
    drawStreaks: Sequencia[];
    homeWinStreaks: Sequencia[];
    awayWinStreaks: Sequencia[];
    bestFirstHalf?: Performance;
    bestSecondHalf?: Performance;
    bestHomeSeason?: Performance;
    bestAwaySeason?: Performance;
    goleadas: Goleada[];
    loading: boolean;
    error: string | null;
}