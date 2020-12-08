import { async } from '@angular/core/testing';
import { delay } from 'rxjs/operators';
import { ServicoFuncionario } from './../../../models/servico-funcionario';
import { Component, OnInit } from '@angular/core';
import { ItemEscala } from 'src/app/models/itemEscala';
import { Servico } from 'src/app/models/servico';
import { EscalaService } from '../escala/escala.service';
import { ServicoEscalaFormService } from '../servico-escala-form.service';
import { Escala } from 'src/app/models/escala';
import { ErroService } from 'src/app/shared/erro/erro.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css'],
})
export class NovoComponent implements OnInit {
  diasSemana: string[] = [];
  loading = false;
  servicoFuncionarioId: number;
  escalas: Escala[];

  constructor(
    private servicoEscalaFormService: ServicoEscalaFormService,
    private erroService: ErroService,
    private activatedRoute: ActivatedRoute,
    private escalaService: EscalaService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params); // { order: "popular" }
      // this.funcionarioId = params.id as number;
      // this.funcionarioNome = params.nome;
    });
    this.escalaService
      .listaDayWeek()
      .subscribe((result) => (this.diasSemana = result));
  }
  listEscalas(servicoFuncionarioId: number) {
    this.servicoEscalaFormService
      .listEscalasServico(servicoFuncionarioId)
      .subscribe(
        (result) => {
          this.escalas = result;
        },
        (error) => {
          console.error(error);
          this.erroService.tratarErro(error);
        }
      );
  }
}
