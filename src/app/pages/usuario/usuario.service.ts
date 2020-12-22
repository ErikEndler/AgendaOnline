import { TokenService } from './../../auth/token.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { HttpClient } from '@angular/common/http';
import { LoginReturn } from 'src/app/models/loginReturn';
import { AppSettings } from 'src/app/shared/appSettings';
import { CrudService } from 'src/app/shared/crud-service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends CrudService<Usuario> {
  user: LoginReturn;
  static eventoAdicionarServico = new EventEmitter();

  constructor(protected http: HttpClient, private tokenService: TokenService) {
    //super(http, 'http://localhost:8080/api/usuario');
    super(http, AppSettings.url + '/api/usuario');
  }
  getCredencial(): LoginReturn {
    console.log(sessionStorage.getItem('token'));
    this.user = this.tokenService.decodePayloadJWT();
    return this.user;
  }
}
