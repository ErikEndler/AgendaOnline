import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginReturn } from '../models/loginReturn';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:8080/login';
  loginReturn: LoginReturn;
  confirmResult: Subject<boolean>;

  constructor(private http: HttpClient) {}

  logar(form) {
    this.confirmResult = new Subject();

    this.http.post(this.url, form).subscribe(
      (success) => {
        sessionStorage.setItem('Authorization', JSON.stringify(success));

        sessionStorage.setItem('logado', 'true');
        console.log(
          'sessionStorage Authorization :' +
            sessionStorage.getItem('Authorization')
        );
        console.log('Logado com sucesso! 1');
        this.confirmResult.next(true);
      },
      (error) => {
        console.log('Erro ao logar ! 1');

        this.confirmResult.next(false);
      }
    );
    return this.confirmResult;
  }
}
