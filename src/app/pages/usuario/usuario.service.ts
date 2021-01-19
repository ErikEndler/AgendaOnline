import { TokenService } from './../../auth/token.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { HttpClient } from '@angular/common/http';
import { LoginReturn } from 'src/app/models/loginReturn';
import { AppSettings } from 'src/app/shared/appSettings';
import { CrudService } from 'src/app/shared/crud-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends CrudService<Usuario> {
  user: LoginReturn;

  constructor(protected http: HttpClient, private tokenService: TokenService) {
    super(http, AppSettings.url + '/api/usuario');
  }
  getCredencial(): LoginReturn {
    this.user = this.tokenService.decodePayloadJWT();
    return this.user;
  }
  listarFuncionarios(): Observable<Usuario[]> {
    return this.http.get<Array<Usuario>>(
      AppSettings.url + '/api/usuario/funcionarios'
    );
  }
  novaSenha(objeto) {
    return this.http.post(AppSettings.url + '/api/usuario/recuperarSenha', objeto);
  }
}
