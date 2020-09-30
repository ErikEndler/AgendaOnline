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

export class HttpsRequestInterceptor implements HttpInterceptor {
  loginReturn: LoginReturn;
  token = null;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl = 'localhost:8080';
    this.loginReturn = JSON.parse(sessionStorage.getItem('Authorization'));
    if (this.loginReturn != null) {
      this.token = this.loginReturn.authorization;
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
export class InterceptorModule {}
