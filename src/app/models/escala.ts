import { ServicoFuncionario } from './servico-funcionario';
import { ItemEscala } from './itemEscala';
export class Escala {
  id: number;
  diaSemana: string;
  servicoFuncionario: ServicoFuncionario;
  itensEscala: ItemEscala[];
}
