import { NotificacaoComponent } from './notificacao/notificacao.component';
import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  timeOut: 5000;
  showProgressBar: true;
  pauseOnHover: true;
  clickToClose: true;
  animate: 'fromRight';

  constructor(private notificacao: NotificationsService) { }

  public criar(tipo: any, titulo: string, msg: string) {

    // const temp = this.form.getRawValue();
    const title = titulo;
    const content = msg;
    const type = tipo;

    // tslint:disable-next-line: max-line-length
    this.notificacao.create(title, content, type, { timeOut: this.timeOut, showProgressBar: this.showProgressBar, pauseOnHover: this.pauseOnHover, animate: this.animate });
  }
}
