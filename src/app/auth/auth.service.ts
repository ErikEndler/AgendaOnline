import { HttpClient, HttpRequest } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginReturn } from '../models/loginReturn';
import { AppSettings } from '../shared/appSettings';
import jwt_decode from 'jwt-decode';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = AppSettings.url + '/login';
  loginReturn: LoginReturn;
  confirmResult: Subject<boolean>;

  eventoLogar = new EventEmitter();

  constructor(private http: HttpClient, private router: Router) { }

  logar(form) {
    this.confirmResult = new Subject();
    this.http.post(this.url, form).subscribe(
      (success) => {
        sessionStorage.setItem('auth', JSON.stringify(success));
        this.loginReturn = jwt_decode(sessionStorage.getItem('auth'));
        console.log('loginreturn ', this.loginReturn);

        //sessionStorage.setItem('id', this.loginReturn.id.toString());
        //sessionStorage.setItem('nome', this.loginReturn.nome.toString());
        console.log('auth  ', sessionStorage.getItem('auth'));

        console.log('jwt decodificado : ', jwt_decode(sessionStorage.getItem('auth')));

        sessionStorage.setItem('logado', 'true');
        console.log('sessionStorage auth :' + sessionStorage.getItem('auth'));
        console.log('Logado com sucesso! 1');
        this.confirmResult.next(true);
        this.eventoLogar.emit();
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
    this.router.navigate(['home']);
  }
}
