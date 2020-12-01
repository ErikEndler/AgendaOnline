import { CrudService } from './../../shared/crud-service';
import { HttpClient } from '@angular/common/http';
import { Categoria } from './../../models/categoria';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/shared/appSettings';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService extends CrudService<Categoria> {
  constructor(protected http: HttpClient) {
    super(http, AppSettings.url + '/api/categoria');
  }
}
