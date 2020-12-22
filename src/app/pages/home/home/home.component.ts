import { Component, OnInit } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private notificacao: NotificacaoService,
    private notification: NotificationsService
  ) { }
  // https://medium.com/@josevieiraneto/push-notifications-com-server-sent-events-spring-boot-c2b7ee6febe9
  ngOnInit(): void { }
  testando(): void {
    //this.notification.create('titulo12', 'contente12');
    this.notificacao.criar(NotificationType.Warn, 'tituloOO', 'menssagemGEM');
  }
}
