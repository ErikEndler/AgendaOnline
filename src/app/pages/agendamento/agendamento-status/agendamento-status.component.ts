import { Agendamento } from './../../../models/agendamento';
import { LoginReturn } from './../../../models/loginReturn';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/auth/token.service';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { AgendamentoService } from '../agendamento.service';

@Component({
  selector: 'app-agendamento-status',
  templateUrl: './agendamento-status.component.html',
  styleUrls: ['./agendamento-status.component.css'],
})
export class AgendamentoStatusComponent implements OnInit {
  constructor(
    private agendamentoService: AgendamentoService,
    private tokenService: TokenService,
    private erroService: ErroService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  loginReturn: LoginReturn;
  listaAgendamentos: Agendamento[];
  agendamentos: Agendamento[];
  listaStatus: string[];
  statusSelect = 'PENDENTE';
  hide = true;
  loading = true;
  page = 1;
  pageSize = 10;
  collectionSize: any;

  ngOnInit(): void {
    this.agendamentoService.listaStatus().subscribe(
      (result) => {
        this.listaStatus = result;
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.status) {
        this.statusSelect = params.status.toUpperCase();
        console.log(this.statusSelect);
      }
    });
    this.loginReturn = this.tokenService.decodePayloadJWT();
    this.listarPorStatus();
  }
  listarPorStatus(): void {
    this.agendamentoService
      .agendamentoPorStatus(this.loginReturn.id, this.statusSelect)
      .subscribe(
        (result) => {
          this.agendamentos = result;
          this.collectionSize = this.agendamentos.length;
          console.log(result);
          this.loading = false;
          if (result.length > 0) {
            this.hide = false;
          }
          this.refresh();
        },
        (error) => {
          console.error(error);
          this.erroService.tratarErro(error);
        }
      );
  }
  selecionarStatus(): void {
    console.log(this.statusSelect);
    this.listarPorStatus();
  }
  refresh(): void {
    this.listaAgendamentos = this.agendamentos
      .map((obj, i) => ({ ...obj }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  trim(palavra: string): string {
    return palavra.slice(-5);
  }
  trimData(palavra: string): string {
    return palavra.slice(0, 10);
  }
  editar(id): void {
    this.router.navigate(['agendamento/form/' + id]);
  }
  voltarPagina(): void {
    window.history.back();
  }
}
