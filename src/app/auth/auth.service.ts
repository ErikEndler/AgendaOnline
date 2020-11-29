import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginReturn } from '../models/loginReturn';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:8080/login';
  loginReturn: LoginReturn;
  confirmResult: Subject<boolean>;

  constructor(private http: HttpClient, private router: Router) {}

  logar(form) {
    this.confirmResult = new Subject();

    this.http.post(this.url, form).subscribe(
      (success) => {
        this.loginReturn = success as LoginReturn;
        sessionStorage.setItem('auth', JSON.stringify(success));
        sessionStorage.setItem('id', this.loginReturn.id.toString());
        console.log(sessionStorage.getItem('auth'));

        sessionStorage.setItem('logado', 'true');
        console.log('sessionStorage auth :' + sessionStorage.getItem('auth'));
        console.log('Logado com sucesso! 1');
        this.confirmResult.next(true);
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
