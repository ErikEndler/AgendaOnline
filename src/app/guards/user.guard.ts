import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../auth/token.service';
import { LoginReturn } from '../models/loginReturn';
import { ErroService } from '../shared/erro/erro.service';
import { ModalLoginService } from '../shared/modal-login/modal-login.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  user: LoginReturn;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private modalLoginService: ModalLoginService,
    private erroService: ErroService
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
    console.log('entrou no user guard');
    if (this.tokenService.getToken()) {
      this.user = this.tokenService.decodePayloadJWT();
      if (this.user) {
        return true;
      }
    } else {
      const result$ = this.modalLoginService.open(next.url.toString());
      result$.asObservable().subscribe(
        (result) => {
          console.log('success do userguards ', result);
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
