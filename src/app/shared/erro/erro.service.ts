import { Injectable } from '@angular/core';
import { NotificationType } from 'angular2-notifications';
import { error } from 'protractor';
import { NotificacaoService } from '../notificacao/notificacao.service';

@Injectable({
  providedIn: 'root',
})
export class ErroService {
  constructor(private notificacaoService: NotificacaoService) {}

  tratarErro(errorObj): void {
    const status = errorObj.status;
    const erro = errorObj.error.error;
    const message = errorObj.error.message;

    if (message.match(/.*JWT expired.*/)) {
      console.log('fazer metodo de logout');
    } else if (status > 400 || status < 505) {
      const titulo = status + '-' + erro;
      this.notificacaoService.criar(NotificationType.Error, titulo, message);
    }
  }
}
