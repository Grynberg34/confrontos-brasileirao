export interface TabelaItem {
    time: string;
    pontos: number;
    golsPro: number;
    golsContra: number;
    saldo: number;
    vitorias: number;
    empates: number;
    derrotas: number;
}

export interface JogoDaRodada {
    mandante: string;
    visitante: string;
    golsMandante: number;
    golsVisitante: number;
    data: string;
}

export interface Tabela {
    tabela: TabelaItem[];
    jogosDaRodada: JogoDaRodada[];
    ano: number;
    rodada: number;
    loading: boolean;
    error: string | null;
    temRodadaSeguinte: boolean;
}