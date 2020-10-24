import { Escala } from './../../models/escala';
import { CrudService } from './../../shared/crud-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EscalaService extends CrudService<Escala> {
  constructor(protected http: HttpClient) {
    super(http, 'http://localhost:8080/api/escala');
  }
}
