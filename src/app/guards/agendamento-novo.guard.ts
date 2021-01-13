import { ErroService } from '../shared/erro/erro.service';
import { TokenService } from '../auth/token.service';
import { ModalLoginService } from '../shared/modal-login/modal-login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Agendamento } from '../models/agendamento';
import { AgendamentoService } from '../pages/agendamento/agendamento.service';
import { LoginReturn } from '../models/loginReturn';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoNovoGuard implements CanActivate {
  constructor(
    private service: AgendamentoService,
    private router: Router,
    private modalLoginService: ModalLoginService,
    private tokenService: TokenService,
    private erroService: ErroService
  ) { }
  user: LoginReturn;
  logado: boolean;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (sessionStorage.getItem('logado') === 'true') {
      this.logado = true;
      return true;
    }
    if (this.tokenService.getToken()) {
      this.user = this.tokenService.decodePayloadJWT();
      if (this.user) {
        if (this.user.role === 'ROLE_ADMIN') {
          return true;
        } else {
          return false;
        }
      }
    }
  }

}
