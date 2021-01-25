import { Observable } from 'rxjs';
import { Avaliacao } from './../../models/avaliacao';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/crud-service';
import { AppSettings } from 'src/app/shared/appSettings';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService extends CrudService<Avaliacao> {
  constructor(protected http: HttpClient) {
    super(http, AppSettings.url + '/api/avaliacao');
  }
  avaliacaoAtendimento(id): Observable<Avaliacao> {
    return this.http.get<Avaliacao>(
      AppSettings.url + '/api/avaliacao/atendimento/' + id
    );
  }
}
