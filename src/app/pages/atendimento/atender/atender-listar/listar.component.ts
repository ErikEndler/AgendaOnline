import { LoginReturn } from '../../../../models/loginReturn';
import { AgendamentoService } from '../../../agendamento/agendamento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/auth/token.service';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { Agendamento } from 'src/app/models/agendamento';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
})
export class ListarComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private erroService: ErroService,
    private agendamentoService: AgendamentoService
  ) {}
  loginReturn: LoginReturn;
  lista: Agendamento[];
  agendamentos: Agendamento[];
  page = 1;
  pageSize = 5;
  collectionSize: any;
  loading = false;
  colunas: string[] = ['Horário', 'Cliente', 'Serviço', 'opções'];
  listEmpy = true;

  ngOnInit(): void {
    this.loginReturn = this.tokenService.decodePayloadJWT();
    this.listar();
  }
  listar(): void {
    this.loading = true;
    this.agendamentoService.agendamentoAtendivel(this.loginReturn.id).subscribe(
      (result) => {
        this.lista = result;
        this.collectionSize = this.lista.length;
        this.loading = false;
        if (this.lista.length > 0) {
          this.listEmpy = false;
        }
        this.refresh();
      },
      (error) => {
        console.error(error);
        console.log('Erro ao listar');
        this.erroService.tratarErro(error);
        this.loading = false;
      }
    );
  }
  refresh(): void {
    this.agendamentos = this.lista
      .map((usuario, i) => ({ ...usuario }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  atender(id): void {
    this.router.navigate(['atendimento/atender/' + id]);
  }
  agendamentosPendentes(): void {
    this.router.navigate(['agendamento/status']);
  }
  voltarPagina(): void {
    window.history.back();
  }
}
