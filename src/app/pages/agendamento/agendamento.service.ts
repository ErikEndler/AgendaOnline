import { Agendamento } from './../../models/agendamento';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/crud-service';
import { AppSettings } from 'src/app/shared/appSettings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService extends CrudService<Agendamento> {
  constructor(protected http: HttpClient) {
    super(http, AppSettings.url + '/api/agendamento');
  }
  listaAgendamentosData(datas, funcionario): Observable<Agendamento[][]> {
    let parametros = new HttpParams();
    parametros = parametros.set('funcionario', funcionario);
    datas.forEach((element) => {
      parametros = parametros.append('data', element);
    });
    return this.http.get<Array<Agendamento[]>>(
      AppSettings.url + '/api/agendamento/data',
      { params: parametros }
    );
  }
}
