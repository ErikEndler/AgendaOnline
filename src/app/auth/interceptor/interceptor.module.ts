import { TokenService } from './../token.service';
import { LoginReturn } from './../../models/loginReturn';
import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppSettings } from 'src/app/shared/appSettings';

export class HttpsRequestInterceptor implements HttpInterceptor {
  loginReturn: LoginReturn;
  token: string = null;
  tokenService = new TokenService();

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('entrou no interseptador');
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl = AppSettings.urlReduzida;
    this.token = this.tokenService.getToken();

    if (this.token && requestUrl[2] === apiUrl) {
      // console.log(request.headers.set('Authorization', this.token));
      const dupReq = request.clone({
        //headers: request.headers.set('Authorization', 'Bearer ' + this.token),
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
