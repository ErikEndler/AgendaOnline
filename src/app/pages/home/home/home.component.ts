import { NotificacaoService } from './../../../shared/notificacao/notificacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private notificacao: NotificacaoService) { }

  ngOnInit(): void {
  }
  testando() {
    this.notificacao.criar('error', 'titulo', 'menssagem');
  }

}
