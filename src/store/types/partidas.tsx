export interface Partida {
    id: number;
    data: string;
    rodada: number;
    ano: number;
    time_mandante: string;
    time_visitante: string;
    gols_mandante: number;
    gols_visitante: number;
    resultado: string;
    tecnico_mandante: string | null;
    tecnico_visitante: string | null;
    gols_jogadores_mandante: string | null;
    gols_jogadores_visitante: string | null;
}

export interface HomeStats {
    vitorias: number;
    empates: number;
    vitoriasY?: number;
    vitoriasX?: number;
}

export interface TimeStats {
    nome: string;
    vitorias: number;
    gols: number;
    pontos: number;
    ultimasVitorias: number;
    homeStats: HomeStats;
}

export interface ConfrontosData {
    confrontos: Partida[];
    empates: number;
    ultimosEmpates: number;
    timeX: TimeStats;
    timeY: TimeStats;
}

export interface PartidasState {
    data: ConfrontosData | null;
    loading: boolean;
    error: string | null;
}

export interface PartidaRequest {
    timeX: string;
    timeY: string;
}