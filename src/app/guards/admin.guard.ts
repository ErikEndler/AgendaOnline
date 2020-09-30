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

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
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
    if (
      sessionStorage.getItem('logado') === 'true' &&
      this.user.role === 'ROLE_ADMIN'
    ) {
      return true;
    } else {
      return this.router.navigate(['']);
    }
  }
}
