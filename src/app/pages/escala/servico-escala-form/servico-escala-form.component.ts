import { ServicoEscalaFormService } from './../servico-escala-form.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Servico } from 'src/app/models/servico';
import { ServicoService } from '../../servico/servico.service';
import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';
import { NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-servico-escala-form',
  templateUrl: './servico-escala-form.component.html',
  styleUrls: ['./servico-escala-form.component.css'],
})
export class ServicoEscalaFormComponent implements OnInit {
  constructor(
    private serviceServico: ServicoService,
    private servicoEscalaFormService: ServicoEscalaFormService,
    private notificacaoService: NotificacaoService
  ) { }
  selecionado = false;
  servico: Servico;
  servicos: Servico[];
  listaServico: Servico[];
  page = 1;
  pageSize = 4;
  collectionSize: any;
  loading = true;
  colunas: string[] = ['select', 'nome', 'descrição'];

  ngOnInit(): void {
    this.list();
  }
  list(): void {
    this.loading = true;
    this.serviceServico.list().subscribe((dados) => {
      this.listaServico = dados;
      this.collectionSize = this.listaServico.length;
      this.loading = false;
      this.refreshListServico();
    }),
      (error) => { };
  }

  refreshListServico(): void {
    this.servicos = this.listaServico
      .map((servico, i) => ({ ...servico }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  // avança para proxima estapa do wizard
  next(): void {
    this.verificaSelecao();
    this.servicoEscalaFormService.emiteEventoServico(this.servico);
  }
  verificaSelecao() {
    if (this.servico === undefined) {
      this.notificacaoService.criar(NotificationType.Error, 'Erro', 'Selecione uma opção');
    }
  }
  // ao selecionar um item tabela atribui valor da linha a variavel servicos
  onselect(variavel: Servico): void {
    this.servico = variavel;
    this.selecionado = true;
  }
}
