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

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  user: LoginReturn;
  constructor(
    private router: Router,
    private modalLoginService: ModalLoginService,
    private tokenService: TokenService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.tokenService.getToken()) {
      this.user = this.tokenService.decodePayloadJWT();
    }
    if (this.user) {
      if (this.user.role === 'ROLE_ADMIN') {
        return true;
      } else {
        return false;
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
          (success) => console.log('logou e redirecionou'),
          (error) => {
            console.error(error),
              console.log(error),
              console.log('ERRO AO redirecionar');
          }
        );

      return this.router.navigate(['home']);
    }
  }
}
