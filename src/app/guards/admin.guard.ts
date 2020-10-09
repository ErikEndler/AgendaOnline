import { LoginReturn } from './../models/loginReturn';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ModalLoginService } from '../shared/modal-login/modal-login.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  user: LoginReturn;
  constructor(
    private router: Router,
    private modalLoginService: ModalLoginService
  ) {
    if (sessionStorage.getItem('auth')) {
      this.user = JSON.parse(sessionStorage.getItem('auth'));
      console.log(' constructor Role =' + this.user.role);
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (sessionStorage.getItem('logado') === 'true') {
      if (this.user.role === 'ROLE_ADMIN') {
        return true;
      } else {
        return false;
      }
    } else {
      console.log('DESTINO : ' + next.url.toString());
      this.modalLoginService.open(next.url.toString());

      return this.router.navigate(['home']);
    }
  }
}
