import { TokenService } from '../../../auth/token.service';
import { element } from 'protractor';
import { delay } from 'rxjs/operators';
import { AgendamentoService } from '../agendamento.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Agendamento } from 'src/app/models/agendamento';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { Router } from '@angular/router';
import { LoginReturn } from 'src/app/models/loginReturn';
import * as moment from 'moment';

@Component({
  selector: 'app-agendamento-view',
  templateUrl: './agendamento-view.component.html',
  styleUrls: ['./agendamento-view.component.css'],
})
export class AgendamentoViewComponent implements OnInit {
  hide = true;
  userLogin: LoginReturn;
  empy = true;
  funcionarioID: number;
  loading = false;
  colunas: string[] = [];
  agendamentos$: Observable<Agendamento[][]>;
  dia: string;
  data: string;

  constructor(
    private agendamentoService: AgendamentoService,
    private erroService: ErroService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.userLogin = this.tokenService.decodePayloadJWT();
    this.funcionarioID = this.userLogin.id;
    this.dia = moment().format('yyyy-MM-DD');
    this.data = this.dia;
    this.agendaHoje();
  }
  trim(palavra: string): string {
    return palavra.slice(-5);
  }
  agendaHoje(): void {
    this.agendaDia(this.dia);
  }
  agendaDia(data?): void {
    this.loading = true;
    this.empy = true;
    const dia: string[] = [];
    dia.push(data);
    this.agendamentos$ = this.agendamentoService.listaAgendamentosData(
      dia,
      this.funcionarioID
    );
    this.agendamentos$.pipe(delay(400)).subscribe(
      (sucess) => {
        if (sucess[0].length) {
          this.empy = false;
        }
        this.colunas = [];
        this.colunas.push(data);
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
        this.loading = false;
      }
    );
  }

  adicionarAgendamento(): void {
    this.router.navigate(['agendamento/form'], {
      queryParams: {
        funcionarioId: this.funcionarioID,
      },
    });
  }
  avancar(): void {
    this.data = moment(this.data).add(1, 'd').format('yyyy-MM-DD');
    console.log(this.data);
    this.agendaDia(this.data);
  }
  voltar(): void {
    this.data = moment(this.data).subtract(1, 'd').format('yyyy-MM-DD');
    console.log(this.data);
    this.agendaDia(this.data);
  }
  editar(id): void {
    this.router.navigate(['agendamento/form/' + id]);
  }
  aplicaCss(status) {
    if (status === 'PENDENTE') {
      return 'btn-warning';
    }
    if (status === 'AGENDADO') {
      return 'btn-info';
    }
    if (status === 'ATENDIDO') {
      return 'btn-success';
    }
    if (status === 'CANCELADO') {
      return 'btn-default';
    }
    if (status === 'FALTOU') {
      return 'btn-danger';
    }
  }
}
