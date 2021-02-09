export class Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  whatsapp: string;
  sexo: string;
  senha: string;
  role: string;
  notificacao: boolean;
  notificacaoEmail: boolean;
  notificacaoWhatsapp: boolean;
  score: number;
  token?: string;
}
