export interface Partida {
    id: number;
    data: string;
    rodada: number;
    time_mandante: string;
    time_visitante: string;
    gols_mandante: number;
    gols_visitante: number;
    resultado: string;
}
  
export interface TimeStats {
    nome: string;
    vitorias: number;
    gols: number;
    pontos: number;
}
  
export interface ConfrontosData {
    confrontos: Partida[];
    draws: number;
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