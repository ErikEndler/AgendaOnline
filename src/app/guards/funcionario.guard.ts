import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginReturn } from '../models/loginReturn';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioGuard implements CanActivate {
  user: LoginReturn;

  constructor(private router: Router) {
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
    if (
      sessionStorage.getItem('logado') === 'true' &&
      (this.user.role === 'ROLE_ADMIN' || this.user.role === 'ROLE_FUNCIONARIO')
    ) {
      return true;
    } else {
      return this.router.navigate(['']);
    }
  }
}
