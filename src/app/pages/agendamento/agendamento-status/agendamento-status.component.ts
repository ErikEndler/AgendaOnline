import { Agendamento } from './../../../models/agendamento';
import { LoginReturn } from './../../../models/loginReturn';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/auth/token.service';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { AgendamentoService } from '../agendamento.service';

@Component({
  selector: 'app-agendamento-status',
  templateUrl: './agendamento-status.component.html',
  styleUrls: ['./agendamento-status.component.css']
})
export class AgendamentoStatusComponent implements OnInit {

  constructor(
    private agendamentoService: AgendamentoService,
    private tokenService: TokenService,
    private erroService: ErroService,
    private activatedRoute: ActivatedRoute,
  ) { }
  loginReturn: LoginReturn;
  listaAgendamentos: Agendamento[];
  listaStatus: string[];
  statusSelect: string;
  loading = true;
  page = 1;
  pageSize = 4;
  collectionSize: any;

  ngOnInit(): void {
    this.agendamentoService.listaStatus().subscribe((result) => { this.listaStatus = result; },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      });
    this.loginReturn = this.tokenService.decodePayloadJWT();
  }
  listarPorStatus(): void {
    this.agendamentoService.agendamentoPorStatus(this.loginReturn.id, this.statusSelect).subscribe(
      (result) => { this.listaAgendamentos = result; },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      });
  }
  selecionarStatus() { }
  refresh() { }
}
