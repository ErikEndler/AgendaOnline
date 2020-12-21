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
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  user: LoginReturn;
  constructor(
    private router: Router,
    private modalLoginService: ModalLoginService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (sessionStorage.getItem('auth')) {
      this.user = jwt_decode(sessionStorage.getItem('auth'));
      console.log('this.user - ', this.user);
    }
    if (this.user.role === 'ROLE_ADMIN') {
      if (this.user.role === 'ROLE_ADMIN') {
        return true;
      } else {
        return false;
      }
    }
    //else {
    //console.log('DESTINO : ' + next.url.toString());
    // const result$ = this.modalLoginService.open(next.url.toString());
    // result$
    //  .asObservable()
    //  .pipe(
    //    take(1),
    //    switchMap((result) =>
    //      result ? this.router.navigate([next.url.toString()]) : EMPTY
    //    )
    //  )
    //  .subscribe(
    //    (success) => console.log('logou e redirecionou'),
    //    (error) => {
    //      console.error(error),
    //        console.log(error),
    //        console.log('ERRO AO redirecionar');
    //    }
    //  );
    //
    //    return this.router.navigate(['home']);
    //}
  }
}
