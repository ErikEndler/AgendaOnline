import { TokenService } from './token.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginReturn } from '../models/loginReturn';
import { AppSettings } from '../shared/appSettings';
import jwt_decode from 'jwt-decode';
import { NotificacaoRxService } from '../components/notificacao/notificacao-rx.service';

declare interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = AppSettings.url + '/login';
  loginReturn: LoginReturn;
  confirmResult: Subject<boolean>;
  tokenObj: Token;

  eventoLogar = new EventEmitter();

  constructor(
    private http: HttpClient,
    private notificacaoRxService: NotificacaoRxService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  logar(form) {
    this.confirmResult = new Subject();
    this.http.post(this.url, form).subscribe(
      (success) => {
        this.tokenObj = success as Token;
        console.log('this.tokenObj : ', this.tokenObj);
        this.tokenService.setToken(this.tokenObj.token);
        this.confirmResult.next(true);
        this.eventoLogar.emit();
        this.loginReturn = this.tokenService.decodePayloadJWT();
        this.notificacaoRxService.connectClicked(this.loginReturn.cpf);
      },
      (error) => {
        console.log('Erro ao logar ! 1');
        console.log(error);
        this.confirmResult.next(false);
      }
    );
    return this.confirmResult;
  }

  deslogar() {
    sessionStorage.clear();
    this.eventoLogar.emit();
    this.router.navigate(['home']);
    this.notificacaoRxService.disconnectClicked();
  }
}
