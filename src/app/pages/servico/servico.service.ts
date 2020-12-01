import { CrudService } from './../../shared/crud-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servico } from 'src/app/models/servico';
import { AppSettings } from 'src/app/shared/appSettings';

@Injectable({
  providedIn: 'root',
})
export class ServicoService extends CrudService<Servico> {
  constructor(protected http: HttpClient) {
    super(http, AppSettings.url + '/api/servico');
  }
}
