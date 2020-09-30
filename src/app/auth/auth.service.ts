import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginReturn } from '../models/loginReturn';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:8080/login';
  loginReturn: LoginReturn;

  constructor(private http: HttpClient) {}

  logar(form) {
    this.http.post(this.url, form).subscribe((data) => {
      sessionStorage.setItem('Authorization', JSON.stringify(data));

      sessionStorage.setItem('logado', 'true');
      console.log(
        'sessionStorage Authorization :' +
          sessionStorage.getItem('Authorization')
      );
    }),
      (error) => {};
  }
}
