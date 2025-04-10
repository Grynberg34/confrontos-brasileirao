export interface Partida {
    id: number;
    data: string;
    rodada: number;
    time_mandante: string;
    time_visitante: string;
    gols_mandante: number;
    gols_visitante: number;
}
  
export interface PartidasState {
    data: Partida[];
    loading: boolean;
    error: string | null;
}

export interface PartidaRequest {
    timeX: string;
    timeY: string;
}