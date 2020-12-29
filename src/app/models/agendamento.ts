import { ServicoFuncionario } from 'src/app/models/servico-funcionario';
import { Usuario } from "./usuario";

export class Agendamento {
  id: number;
  cliente: Usuario;
  servicoFuncionario: ServicoFuncionario;
  horarioInicio: string;
  horarioFim: string;
  notificacao: boolean;
  obs: string;
}
