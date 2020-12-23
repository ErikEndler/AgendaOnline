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

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  user: LoginReturn;

  constructor(private router: Router, private tokenService: TokenService
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
    if (this.tokenService.getToken()) {
      this.user = this.tokenService.decodePayloadJWT();
    }
    if (this.user) {
      return true;
    } else {
      return this.router.navigate(['']);
    }
  }
}
