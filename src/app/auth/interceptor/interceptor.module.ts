import { LoginReturn } from './../../models/loginReturn';
import { Observable } from 'rxjs';
import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppSettings } from 'src/app/shared/appSettings';
import jwt_decode from 'jwt-decode';

export class HttpsRequestInterceptor implements HttpInterceptor {
  loginReturn: LoginReturn;
  token = null;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('entrou no interseptador');
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl = AppSettings.urlReduzida;
    if (sessionStorage.getItem('auth')) {
      this.loginReturn = jwt_decode(sessionStorage.getItem('auth'));
      if (this.loginReturn !== null && this.loginReturn !== undefined) {
        //this.token = this.loginReturn.Authorization;
        this.token = JSON.parse(sessionStorage.getItem('auth'));
      }
    }

    if (this.token && requestUrl[2] === apiUrl) {
      const dupReq = request.clone({
        headers: request.headers.set('Authorization', this.token),
      });

      return next.handle(dupReq);
    } else {
      return next.handle(request);
    }
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})
export class InterceptorModule { }
