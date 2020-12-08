import { async } from '@angular/core/testing';
import { Escala } from './../../models/escala';
import { ServicoFuncionario } from './../../models/servico-funcionario';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Servico } from 'src/app/models/servico';
import { AppSettings } from 'src/app/shared/appSettings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicoEscalaFormService {
  emitirServico = new EventEmitter<ServicoFuncionario[]>();

  constructor(protected http: HttpClient) {}

  emiteEventoServico(servicoFuncionario: ServicoFuncionario[]): void {
    this.emitirServico.emit(servicoFuncionario);
  }

  getServicoFuncionario(idServico: number): Observable<ServicoFuncionario> {
    return this.http.get<ServicoFuncionario>(
      AppSettings.url + '/api/servico/funcionario/servico/' + idServico
    );
  }
  // lista de escalas pro serviço funcionario
  listEscalasServico(idServicoFuncionario): Observable<Escala[]> {
    return this.http.get<Array<Escala>>(
      AppSettings.url + '/api/escala/servicofuncionario/' + idServicoFuncionario
    );
  }
}
