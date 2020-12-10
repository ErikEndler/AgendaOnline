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
  emitirServicos = new EventEmitter<Servico[]>();

  constructor(protected http: HttpClient) { }

  emiteServicoEatapa2(servicoFuncionario: Servico[]): void {
    this.emitirServicos.emit(servicoFuncionario);
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
  teste(idFuncionario: number, idsServicos: number[]): Observable<Escala[]> {
    let str = '';
    idsServicos.forEach(e => str = str + '&servico=' + e);
    console.log('entrou teste');
    return this.http
      .get<Array<Escala>>(AppSettings.url +
        '/api/escala/servicofuncionario?funcionario=' + idFuncionario + str
      )
      .pipe(delay(200));
  }
}
