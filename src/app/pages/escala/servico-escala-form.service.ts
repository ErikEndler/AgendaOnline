import { EventEmitter, Injectable, Output } from '@angular/core';
import { Servico } from 'src/app/models/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicoEscalaFormService {

  emitirServico = new EventEmitter();

  constructor() { }

  emiteEventoServico(servico: Servico[]): void {
    this.emitirServico.emit(servico);
  }
}
