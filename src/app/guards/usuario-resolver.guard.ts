import { LoginReturn } from './../models/loginReturn';
import { TokenService } from './../auth/token.service';
import { UsuarioService } from './../pages/usuario/usuario.service';
import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioResolverGuard implements Resolve<Usuario> {
  constructor(private service: UsuarioService, private tokenService: TokenService) { }
  usuario: Usuario = new Usuario();
  loginReturn: LoginReturn;
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Usuario> {
    this.loginReturn = this.tokenService.decodePayloadJWT();
    // se for um USER logado paenas retornara seu perfil
    if (this.loginReturn.role === 'ROLE_USER') {
      return this.service.loadByID(this.loginReturn.id);
    }
    if (route.params && route.params.id) {
      return this.service.loadByID(route.params.id);
    }
    if (route.url.toString().includes('funcionario')) {
      console.log('encontrou funcionario na url');
      this.usuario.role = 'ROLE_FUNCIONARIO';
      console.log('this.usuario : ', this.usuario);
      return of(this.usuario);
    }
    return of(new Usuario());
  }
}
