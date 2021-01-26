import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor() { }

  public notifications: string[] = [];

  private client: StompJs.Client;

  connectClicked() {
    if (!this.client || this.client.connected) {
      this.client = new StompJs.Client({
        webSocketFactory: () => new SockJS('http://localhost:8080/notifications'),
        debug: (msg: string) => console.log(msg)
      });

      this.client.onConnect = () => {

        this.client.subscribe('/user/notification/item', (response) => {
          const text: string = JSON.parse(response.body).text;
          console.log('Got ' + text);
          this.notifications.push(text);
        });

        console.info('connected!');
      };

      this.client.onStompError = (frame) => {
        console.error(frame.headers['message']);
        console.error('Details:', frame.body);
      };

      this.client.activate();
    }
  }

  disconnectClicked() {
    if (this.client && this.client.connected) {
      this.client.deactivate();
      this.client = null;
      console.info("disconnected :-/");
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
  startClicked2() {
    if (this.client && this.client.connected) {
      this.client.publish({ destination: '/swns/start' });
    }
  }

  stopClicked2() {
    if (this.client && this.client.connected) {
      this.client.publish({ destination: '/swns/stop' });
    }
  }

}
