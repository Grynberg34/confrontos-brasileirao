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