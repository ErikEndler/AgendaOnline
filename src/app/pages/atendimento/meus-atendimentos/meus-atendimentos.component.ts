import { Atendimento } from './../../../models/atendimento';
import { LoginReturn } from './../../../models/loginReturn';
import { AtendimentoService } from './../atendimento.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/auth/token.service';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meus-atendimentos',
  templateUrl: './meus-atendimentos.component.html',
  styleUrls: ['./meus-atendimentos.component.css'],
})
export class MeusAtendimentosComponent implements OnInit {
  constructor(
    private atendimentoService: AtendimentoService,
    private tokenService: TokenService,
    private erroService: ErroService,
    private router: Router
  ) {}
  loginReturn: LoginReturn;
  listaAtendimento: Atendimento[];
  atendimentos: Atendimento[];
  loading: false;
  page = 1;
  pageSize = 10;
  collectionSize: any;

  ngOnInit(): void {
    this.loginReturn = this.tokenService.decodePayloadJWT();
    this.listar();
  }
  listar(): void {
    this.atendimentoService
      .atendimentoPorFuncionario(this.loginReturn.id)
      .subscribe(
        (result) => {
          this.atendimentos = result;
          this.collectionSize = this.atendimentos.length;
          this.refresh();
        },
        (error) => {
          console.error(error);
          console.log('Erro ao listar');
          this.erroService.tratarErro(error);
        }
      );
  }
  refresh(): void {
    this.listaAtendimento = this.atendimentos
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

  onInfo(id): void {
    this.router.navigate(['atendimento/' + id]);
  }
  voltarPagina(): void {
    window.history.back();
  }
}
