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
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl = 'localhost:8080';
    const token = sessionStorage.getItem('Authorization');
    if (token && (requestUrl[2] = apiUrl)) {
      const dupReq = request.clone({
        headers: request.headers.set(
          'Authorization',
          sessionStorage.getItem('Authorization')
        ),
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
