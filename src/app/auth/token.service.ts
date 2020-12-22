import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  public setToken(tokenString: string): void {
    sessionStorage.setItem('token', tokenString);
    console.log('token ', sessionStorage.getItem('token'));
    sessionStorage.setItem('logado', 'true');
  }
  public getToken(): string {
    if (sessionStorage.length) {
      console.log(sessionStorage.length);
      return sessionStorage.getItem('token');
    }
    return null;
  }
  public decodePayloadJWT(): any {
    try {
      return jwt_decode(this.getToken());
    } catch (Error) {
      return null;
    }
  }
}
