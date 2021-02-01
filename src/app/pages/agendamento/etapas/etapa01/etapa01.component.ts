import { ServicoFuncionario } from './../../../../models/servico-funcionario';
import { EtapasService } from './../etapas.service';
import { Observable } from 'rxjs';
import { Servico } from './../../../../models/servico';
import { ServicoService } from './../../../servico/servico.service';
import { Component, OnInit } from '@angular/core';
import { ErroService } from 'src/app/shared/erro/erro.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/auth/token.service';
import { LoginReturn } from 'src/app/models/loginReturn';
import { ServicoFuncionarioService } from 'src/app/pages/servico-funcionario/servico-funcionario.service';

@Component({
  selector: 'app-etapa01',
  templateUrl: './etapa01.component.html',
  styleUrls: ['./etapa01.component.css'],
})
export class Etapa01Component implements OnInit {
  listempy = true;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  loading1 = false;
  listaServicos: Servico[];
  listaServicosFuncionario: ServicoFuncionario[];
  servicos: Servico[];
  servicosFuncionario: ServicoFuncionario[];
  listaServicos$: Observable<Servico[]>;
  colunas: string[] = ['nome', 'Descrição', 'tempo', 'select'];
  teste: string;
  teste2: string;
  loginReturn: LoginReturn;
  admin: boolean;
  exibirTodos = true;

  constructor(
    private servicoService: ServicoService,
    private erroService: ErroService,
    private etapasService: EtapasService,
    private router: Router,
    private servicoFuncionarioService: ServicoFuncionarioService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.loginReturn = this.tokenService.decodePayloadJWT();
    if (this.loginReturn.role !== 'ROLE_USER') {
      this.admin = true;
    }
    this.teste = moment().endOf('month').format('DD/MM/YYYY');
    this.teste2 = moment().startOf('month').format('DD/MM/YYYY');
    this.listServicos();
  }
  meusServicos(): void {
    this.loading1 = true;
    this.servicoFuncionarioService.listarServicosFuncionario(this.loginReturn.id).subscribe(
      (sucess) => {
        this.listempy = true;
        this.collectionSize = sucess.length;
        this.loading1 = false;
        this.exibirTodos = false;
        this.listaServicosFuncionario = sucess;
        if (sucess.length > 0) {
          this.listempy = false;
        }
        this.refreshServicoFuncionario();
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
        this.loading1 = false;
      });
  }
  listServicos(): void {
    this.loading1 = true;
    this.listaServicos$ = this.servicoService.list();
    this.listaServicos$.subscribe(
      (sucess) => {
        this.exibirTodos = true;
        this.collectionSize = sucess.length;
        this.listaServicos = sucess;
        this.loading1 = false;
        if (sucess.length > 0) {
          this.listempy = false;
        }
        this.refreshServico();
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
        this.loading1 = false;
      }
    );
  }
  refreshServico(): void {
    this.servicos = this.listaServicos
      .map((servico, i) => ({ ...servico }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  refreshServicoFuncionario(): void {
    this.servicosFuncionario = this.listaServicosFuncionario
      .map((servico, i) => ({ ...servico }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  avancar(id): void {
    this.etapasService.emiteEventoServico(id);
  }
  cancelar(): void {
    this.router.navigate(['agendamento']);
  }
}
