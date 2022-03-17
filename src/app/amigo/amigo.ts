export interface Amigo {
    id: number;
    nome: string;
    cpf: number;
    telefone: number;
    email: string;
    status_indicacao_id: number;
}

export interface Status_indicacao {
    id: number;
    sigla: string;
    nome: string;
}
