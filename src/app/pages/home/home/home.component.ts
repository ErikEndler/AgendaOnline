import { NotificacaoService } from './../../../shared/notificacao/notificacao.service';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private notificacao: NotificacaoService,
    private notification: NotificationsService
  ) {}

  ngOnInit(): void {}
  testando(): void {
    //this.notification.create('titulo12', 'contente12');
    this.notificacao.criar('error', 'tituloOO', 'menssagemGEM');
  }
}
