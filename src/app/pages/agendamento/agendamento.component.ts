import { TokenService } from './../../auth/token.service';
import { element } from 'protractor';
import { delay } from 'rxjs/operators';
import { AgendamentoService } from './agendamento.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Agendamento } from 'src/app/models/agendamento';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { Router } from '@angular/router';
import { LoginReturn } from 'src/app/models/loginReturn';
import * as moment from 'moment';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css'],
})
export class AgendamentoComponent implements OnInit {
  hide = true;
  userLogin: LoginReturn;
  empy = true;
  funcionarioID: number;
  loading = false;
  colunas: string[] = [];
  agendamentos$: Observable<Agendamento[][]>;

  constructor(
    private agendamentoService: AgendamentoService,
    private erroService: ErroService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.userLogin = this.tokenService.decodePayloadJWT();
    this.funcionarioID = this.userLogin.id;
    this.agendaDia(moment().format('yyyy-MM-DD'));
  }
  trim(string: string): string {
    return string.slice(-5);
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
        console.log('sucess[0].length', sucess[0].length);
        console.log('sucess.length', sucess);
        if (sucess[0].length) {
          console.log('setou empy com false');
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
}
