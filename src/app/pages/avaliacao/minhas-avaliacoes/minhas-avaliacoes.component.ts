import { LoginReturn } from 'src/app/models/loginReturn';
import { TokenService } from 'src/app/auth/token.service';
import { AvaliacaoService } from 'src/app/pages/avaliacao/avaliacao.service';
import { Component, OnInit } from '@angular/core';
import { Avaliacao } from 'src/app/models/avaliacao';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { RatingService } from 'src/app/shared/rating/rating.service';

@Component({
  selector: 'app-minhas-avaliacoes',
  templateUrl: './minhas-avaliacoes.component.html',
  styleUrls: ['./minhas-avaliacoes.component.css'],
})
export class MinhasAvaliacoesComponent implements OnInit {
  constructor(
    private avaliacaoService: AvaliacaoService,
    private erroService: ErroService,
    private tokenService: TokenService,
    private ratingService: RatingService
  ) {}
  loading = true;
  page = 1;
  pageSize = 5;
  collectionSize: any;
  lista: Avaliacao[];
  avaliacoes: Avaliacao[];
  loginReturn: LoginReturn;

  ngOnInit(): void {
    this.loginReturn = this.tokenService.decodePayloadJWT();
    this.list();
  }
  voltarPagina() {
    window.history.back();
  }
  list(): void {
    this.loading = true;
    this.avaliacaoService.minhasAvaliacoes(this.loginReturn.id).subscribe(
      (dados) => {
        this.lista = dados;
        this.collectionSize = this.lista.length;
        this.loading = false;
        this.refresh();
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }
  refresh(): void {
    this.avaliacoes = this.lista
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

  onRatingStar(avaliacao: Avaliacao): void {
    if (
      this.loginReturn.role === 'ROLE_FUNCIONARIO' ||
      this.loginReturn.role === 'ROLE_ADMIN'
    ) {
      this.ratingService
        .showratingStar(avaliacao.atendimento, true, true, avaliacao)
        .subscribe((result) => {
          console.log(result);
        });
    } else if (this.loginReturn.role === 'ROLE_USER') {
      this.ratingService
        .showratingStar(avaliacao.atendimento, false, true, avaliacao)
        .subscribe((result) => {
          console.log(result);
        });
    }
  }
}
