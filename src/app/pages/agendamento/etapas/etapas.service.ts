import { Agendamento } from './../../../models/agendamento';
import { ServicoFuncionario } from 'src/app/models/servico-funcionario';
import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class EtapasService {
  constructor() { }
  eventoServico = new EventEmitter<number>();
  eventoServicoFuncionario = new EventEmitter<ServicoFuncionario>();
  eventoAgendamento = new EventEmitter<Agendamento>();
  eventoCliente = new EventEmitter<Usuario>();

  emiteEventoServico(idServico: number): void {
    this.eventoServico.emit(idServico);
  }

  emiteServicoFuncionario(servicoFuncionario: ServicoFuncionario): void {
    this.eventoServicoFuncionario.emit(servicoFuncionario);
  }

  emiteAgendamento(agendamento: Agendamento): void {
    this.eventoAgendamento.emit(agendamento);
  }
  emiteCliente(cliente: Usuario): void {
    this.eventoCliente.emit(cliente);
  }
}
