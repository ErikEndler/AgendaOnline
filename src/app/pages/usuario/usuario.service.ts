import { CrudService } from './../../shared/crud-service';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends CrudService<Usuario> {
  constructor(protected http: HttpClient) {
    super(http, 'http://localhost:8080/api/usuario');
  }
}
