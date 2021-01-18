import { CrudService } from './../../shared/crud-service';
import { Injectable } from '@angular/core';
import { Atendimento } from 'src/app/models/atendimento';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/shared/appSettings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtendimentoService extends CrudService<Atendimento> {
  constructor(protected http: HttpClient) {
    super(http, AppSettings.url + '/api/atendimento');
  }
  atendimentoPorFuncionario(idFuncionario): Observable<Atendimento[]> {
    return this.http.get<Array<Atendimento>>(
      AppSettings.url + '/api/atendimento/funcionario/' + idFuncionario
    );
  }
}
