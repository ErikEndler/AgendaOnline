import { EtapasService } from './../etapas.service';
import { Observable } from 'rxjs';
import { Servico } from './../../../../models/servico';
import { ServicoService } from './../../../servico/servico.service';
import { Component, OnInit } from '@angular/core';
import { ErroService } from 'src/app/shared/erro/erro.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

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
  servicos: Servico[];
  listaServicos$: Observable<Servico[]>;
  colunas: string[] = ['nome', 'Descrição', 'tempo', 'select'];
  teste: string;
  teste2: string;

  constructor(
    private servicoService: ServicoService,
    private erroService: ErroService,
    private etapasService: EtapasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teste = moment().endOf('month').format('DD/MM/YYYY');
    this.teste2 = moment().startOf('month').format('DD/MM/YYYY');
    this.listServicos();
  }
  listServicos(): void {
    this.loading1 = true;
    this.listaServicos$ = this.servicoService.list();
    this.listaServicos$.subscribe(
      (sucess) => {
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
  avancar(id): void {
    this.etapasService.emiteEventoServico(id);
  }
  cancelar() {
    this.router.navigate(['agendamento']);
  }
}
