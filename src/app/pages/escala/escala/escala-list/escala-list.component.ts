import { Servico } from './../../../../models/servico';
import { ErroService } from './../../../../shared/erro/erro.service';
import { ServicoEscalaFormService } from './../../servico-escala-form.service';
import { EscalaService } from './../escala.service';
import { Escala } from './../../../../models/escala';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ModalConfirmacaoService } from 'src/app/shared/modal-confirmacao/modal-confirmacao.service';

@Component({
  selector: 'app-escala-list',
  templateUrl: './escala-list.component.html',
  styleUrls: ['./escala-list.component.css'],
})
export class EscalaListComponent implements OnInit {
  loading = true;
  listempy = true;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  escalas: Escala[];
  colunas: string[] = ['select', 'dia semana'];
  listaServico: Servico[];
  servicoID: Servico;
  selecionadoEtapa2 = false;
  diasSemana: string[];
  novalista: Escala[];
  diasSelecionados: string[] = [];

  constructor(
    private escalaService: EscalaService,
    private servicoEscalaFormService: ServicoEscalaFormService,
    private modalCOnfirm: ModalConfirmacaoService,
    private erroService: ErroService
  ) { }

  ngOnInit(): void {
    this.servicoEscalaFormService.emitirServico.subscribe((result) => {
      this.listaServico = result;
      console.log('lista servico', this.listaServico);
      if (this.listaServico.length > 0) {
        this.list();
        console.log('chamou  o list');
      }
    });
    if (this.listaServico !== undefined) {
      if (this.listaServico.length > 0) {
        this.list();
        console.log('chamou  o list');
      }
      // fazer logica de listar
    }

  }
  onEdit(id): void {
    // this.router.navigate(['servicoEditar', id]);
  }
  onDelete(id): void {
    const result$ = this.modalCOnfirm.showConfirm(
      'Confirmação',
      'Deseja Excluir??',
      'Confirmar'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) => (result ? this.escalaService.remove(id) : EMPTY))
      )
      .subscribe(
        (success) => {
          console.log('Excluido com sucesso!');
          console.log('Excluido com sucesso!'), this.ngOnInit();
        },
        (error) => {
          console.error(error);
          this.erroService.tratarErro(error);
        }
      );
  }
  list(id?: number): void {
    this.loading = true;
    this.escalaService.listaDayWeek().subscribe((result) => {
      this.diasSemana = result;
      this.collectionSize = this.diasSemana.length;
      this.loading = false;
      if (this.diasSemana.length > 0) {
        this.listempy = false;
      } else {
        this.listempy = true;
      }
    }, (error) => {
      console.error(error);
      this.erroService.tratarErro(error);
    });

  }
  onChange(variavel: string, isChecked: boolean): void {
    if (isChecked) {
      this.diasSelecionados.push(variavel);
    } else {
      const index = this.diasSelecionados.indexOf(variavel);
      this.diasSelecionados.splice(index, 1);
    }
    this.escalaService.selecionarEscala();
    this.selecionadoEtapa2 = true;
  }
  nextEtapa2(): void {
    this.escalaService.avancarEtapa(this.diasSelecionados);
  }
  voltar(): void {
    this.selecionadoEtapa2 = false;
  }
}
