import { LoginReturn } from './../../models/loginReturn';
import { TokenService } from 'src/app/auth/token.service';
import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';

import * as SockJS from 'sockjs-client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificacaoRxService {
  constructor(private tokenService: TokenService) {}

  loginReturn: LoginReturn = this.tokenService.decodePayloadJWT();
  private client: RxStomp;

  public notifications: string[] = [];

  connectClicked(cpf?: string) {
    if (!this.client || !this.client.connected) {
      this.client = new RxStomp();
      this.client.configure({
        webSocketFactory: () =>
          new SockJS('http://localhost:8080/notifications'),
        debug: (msg: string) => console.log(msg),
      });
      this.client.activate();

      this.watchForNotifications(cpf);

      console.info('connected!');
    }
  }

  private watchForNotifications(cpf?: string) {
    this.client
      .watch('/notification/' + cpf)
      .pipe(
        map((response) => {
          const text: string = JSON.parse(response.body).text;
          console.log('Got ' + text);
          return text;
        })
      )
      .subscribe((notification: string) =>
        this.notifications.push(notification)
      );
  }

  disconnectClicked() {
    if (this.client && this.client.connected) {
      this.client.deactivate();
      this.client = null;
      console.info('disconnected :-/');
    }
  }

  startClicked() {
    if (this.client && this.client.connected) {
      this.client.publish({ destination: '/swns/start' });
    }
  }

  stopClicked() {
    if (this.client && this.client.connected) {
      this.client.publish({ destination: '/swns/stop' });
    }
  }
}
