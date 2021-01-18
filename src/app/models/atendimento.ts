import { Avaliacao } from './avaliacao';
import { Usuario } from './usuario';
import { Agendamento } from './agendamento';
export class Atendimento {
  id: number;
  agendamento: Agendamento;
  funcionario: Usuario;
  inicio: string;
  fim: string;
  avaliacao: Avaliacao;
}
