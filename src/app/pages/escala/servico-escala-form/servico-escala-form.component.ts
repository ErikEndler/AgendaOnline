import { Observable } from 'rxjs';
import { ServicoFuncionario } from './../../../models/servico-funcionario';
import { ServicoFuncionarioService } from './../../servico-funcionario/servico-funcionario.service';
import { ErroService } from './../../../shared/erro/erro.service';
import { ServicoEscalaFormService } from './../servico-escala-form.service';
import { Component, Input, OnInit } from '@angular/core';
import { Servico } from 'src/app/models/servico';
import { NotificacaoService } from 'src/app/shared/notificacao/notificacao.service';
import { NotificationType } from 'angular2-notifications';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-servico-escala-form',
  templateUrl: './servico-escala-form.component.html',
  styleUrls: ['./servico-escala-form.component.css'],
})
export class ServicoEscalaFormComponent implements OnInit {
  constructor(
    private servicoEscalaFormService: ServicoEscalaFormService,
    private notificacaoService: NotificacaoService,
    private erroService: ErroService,
    private servicoFuncionarioService: ServicoFuncionarioService
  ) {}
  selecionado = false;
  // servicoFuncionario: ServicoFuncionario[] = [];
  servicoOut: Servico[] = [];
  listaServicoFuncionario: ServicoFuncionario[];
  listaServicoFuncionario$: Observable<ServicoFuncionario[]>;
  page = 1;
  pageSize = 4;
  collectionSize: any;
  loading = true;
  colunas: string[] = ['select', 'nome', 'descrição'];
  @Input() funcionario: Usuario;

  ngOnInit(): void {
    this.list();
  }
  list(): void {
    this.loading = true;
    this.listaServicoFuncionario$ = this.servicoFuncionarioService.listarServicosFuncionario(
      this.funcionario.id
    );
    this.listaServicoFuncionario$.subscribe(
      (dados) => {
        this.collectionSize = dados.length;
        this.loading = false;
        this.refreshListServico(dados);
      },
      (error) => {
        console.error(error);
        this.erroService.tratarErro(error);
      }
    );
  }

  refreshListServico(listaSF: ServicoFuncionario[]): void {
    this.listaServicoFuncionario = listaSF
      .map((servico, i) => ({ ...servico }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  // avança para proxima estapa do wizard
  next(): void {
    this.verificaSelecao();
    this.servicoEscalaFormService.emiteServicoEatapa2(this.servicoOut);
  }
  verificaSelecao(): void {
    if (this.servicoOut === undefined) {
      this.notificacaoService.criar(
        NotificationType.Error,
        'Erro',
        'Selecione uma opção'
      );
    }
  }
  // ao selecionar um item tabela atribui valor da linha a variavel servicos
  onChange(servico: Servico, isChecked: boolean): void {
    // implementar pegar id servico e id funcionario
    if (isChecked) {
      this.servicoOut.push(servico);
    } else {
      const index = this.servicoOut.indexOf(servico);
      this.servicoOut.splice(index, 1);
    }
    this.selecionado = true;
  }
  teste() {
    this.servicoEscalaFormService
      .teste(1, [1, 2])
      .subscribe((result) => console.log(result));
  }
}
