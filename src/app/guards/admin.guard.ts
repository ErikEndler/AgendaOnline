import { NotificacaoRxService } from './../components/notificacao/notificacao-rx.service';
import { LoginReturn } from './../models/loginReturn';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { ModalLoginService } from '../shared/modal-login/modal-login.service';
import { switchMap, take } from 'rxjs/operators';
import { TokenService } from '../auth/token.service';
import { ErroService } from '../shared/erro/erro.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  user: LoginReturn;
  constructor(
    private router: Router,
    private modalLoginService: ModalLoginService,
    private tokenService: TokenService,
    private notificacaoRxService: NotificacaoRxService,
    private erroService: ErroService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('entrou no admin guard');
    if (this.tokenService.getToken()) {
      this.user = this.tokenService.decodePayloadJWT();
      if (this.user) {
        this.notificacaoRxService.connectClicked(this.user.cpf);
        if (this.user.role === 'ROLE_ADMIN') {
          return true;
        } else {
          return false;
        }
      }
    } else {
      console.log('DESTINO : ' + next.url.toString());
      const result$ = this.modalLoginService.open(state.url.toString());
      result$.asObservable().subscribe(
        (result) => {
          if (result === true) {
            console.log('logou e redirecionou');
            return this.router.navigate([state.url.toString()]);
          } else {
            return false;
          }
        },
        (error) => {
          console.error(error);
          console.log('ERRO AO redirecionar');
          this.erroService.tratarErro(error);
        }
      );
      return this.router.navigate(['home']);
    }
  }
}
