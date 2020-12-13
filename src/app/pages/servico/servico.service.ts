import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servico } from 'src/app/models/servico';
import { AppSettings } from 'src/app/shared/appSettings';
import { CrudService } from 'src/app/shared/crud-service';

@Injectable({
  providedIn: 'root',
})
export class ServicoService extends CrudService<Servico> {
  constructor(protected http: HttpClient) {
    super(http, AppSettings.url + '/api/servico');
  }
}
