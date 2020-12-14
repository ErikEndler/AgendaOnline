import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css'],
})
export class AgendamentoComponent implements OnInit {
  funcionarioID: number;
  loading = false;
  colunas: [];

  constructor() {}

  ngOnInit(): void {
    this.funcionarioID = parseInt(sessionStorage.getItem('id'), 10);
  }
  agendaDia() {
    // pegar id do funcionario
  }
}
