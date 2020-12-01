import { CrudService } from './../../shared/crud-service';
import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { HttpClient } from '@angular/common/http';
import { LoginReturn } from 'src/app/models/loginReturn';
import { AppSettings } from 'src/app/shared/appSettings';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends CrudService<Usuario> {
  user: LoginReturn;
  static eventoAdicionarServico = new EventEmitter();

  constructor(protected http: HttpClient) {
    //super(http, 'http://localhost:8080/api/usuario');
    super(http, AppSettings.url + '/api/usuario');
  }
  getCredencial(): LoginReturn {
    console.log(sessionStorage.getItem('auth'));
    this.user = JSON.parse(sessionStorage.getItem('auth'));
    return this.user;
  }
}
