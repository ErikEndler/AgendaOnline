import { CrudService } from './../../shared/crud-service';
import { HttpClient } from '@angular/common/http';
import { Categoria } from './../../models/categoria';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService extends CrudService<Categoria> {
  constructor(protected http: HttpClient) {
    super(http, 'http://localhost:8080/api/categoria');
  }
}
