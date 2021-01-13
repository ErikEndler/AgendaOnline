import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { TokenService } from '../auth/token.service';
import { LoginReturn } from '../models/loginReturn';
import { ErroService } from '../shared/erro/erro.service';
import { ModalLoginService } from '../shared/modal-login/modal-login.service';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioGuard implements CanActivate {
  user: LoginReturn;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private erroService: ErroService,
    private modalLoginService: ModalLoginService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('Authorization'));
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('entrou no funcionario guard');
    if (this.tokenService.getToken()) {
      this.user = this.tokenService.decodePayloadJWT();
      if (this.user) {
        if (
          this.user.role === 'ROLE_ADMIN' ||
          this.user.role === 'ROLE_FUNCIONARIO'
        ) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      console.log('DESTINO : ' + next.url.toString());
      const result$ = this.modalLoginService.open(next.url.toString());
      result$
        .asObservable()
        .pipe(
          take(1),
          switchMap((result) =>
            result ? this.router.navigate([next.url.toString()]) : EMPTY
          )
        )
        .subscribe(
          (success) => {
            console.log('logou e redirecionou');
            return this.router.navigate([next.url.toString()]);
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
